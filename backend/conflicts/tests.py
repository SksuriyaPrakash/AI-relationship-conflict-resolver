from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from users.models import CoupleProfile
from conflicts.models import ConflictSession, DailyCheckin, ProgressLog, ChatMessage, AIAnalysisResult
from rest_framework_simplejwt.tokens import AccessToken

from django.test import TransactionTestCase
from channels.testing import WebsocketCommunicator
from conflict_resolver.asgi import application
from asgiref.sync import sync_to_async

User = get_user_model()

class ConflictsAPITests(APITestCase):
    def setUp(self):
        # Setup linked couple users
        self.p1 = User.objects.create_user(username="p1", password="password", email="p1@example.com")
        self.p2 = User.objects.create_user(username="p2", password="password", email="p2@example.com")
        self.couple = CoupleProfile.objects.create(partner_1=self.p1, partner_2=self.p2, relationship_duration=3)
        
        # Authenticate p1
        login_res = self.client.post(reverse('token_obtain_pair'), {"username": "p1", "password": "password"}, format='json')
        self.token = login_res.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

    def test_session_lifecycle_api(self):
        # 1. Create a session
        url = reverse('session-list')
        res = self.client.post(url, {}, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        session_id = res.data["id"]
        
        # Verify database entities
        session = ConflictSession.objects.get(id=session_id)
        self.assertEqual(session.status, "collecting")
        
        # Verify initial ProgressLog
        progress = ProgressLog.objects.filter(session=session).first()
        self.assertIsNotNone(progress)
        self.assertEqual(progress.percentage, 10)

        # 2. Block creating second active session
        res_fail = self.client.post(url, {}, format='json')
        self.assertEqual(res_fail.status_code, status.HTTP_400_BAD_REQUEST)

        # 3. Create check-in
        checkin_url = reverse('checkin-list')
        checkin_data = {
            "session": session_id,
            "status": "partial",
            "note": "We are talking but still have some issues."
        }
        res_checkin = self.client.post(checkin_url, checkin_data, format='json')
        self.assertEqual(res_checkin.status_code, status.HTTP_201_CREATED)
        self.assertEqual(DailyCheckin.objects.filter(session=session).count(), 1)

        # 4. Progress list
        progress_url = reverse('progress-list')
        res_progress = self.client.get(progress_url)
        self.assertEqual(res_progress.status_code, status.HTTP_200_OK)
        self.assertTrue(len(res_progress.data) >= 1)

class ConflictWebSocketTests(TransactionTestCase):
    def setUp(self):
        # Setup linked couple users
        self.p1 = User.objects.create_user(username="husb", password="pwd", email="h@ex.com", language_preference="english")
        self.p2 = User.objects.create_user(username="wife", password="pwd", email="w@ex.com", language_preference="english")
        self.couple = CoupleProfile.objects.create(partner_1=self.p1, partner_2=self.p2, relationship_duration=4)
        
        # Create a session
        self.session = ConflictSession.objects.create(couple=self.couple, status="collecting")

        # Generate JWT tokens
        self.t1 = str(AccessToken.for_user(self.p1))
        self.t2 = str(AccessToken.for_user(self.p2))

    async def test_full_conflict_resolution_websocket_flow(self):
        # 1. Partner 1 connects
        c1 = WebsocketCommunicator(application, f"/ws/conflict/{self.session.id}/?token={self.t1}")
        connected1, _ = await c1.connect()
        self.assertTrue(connected1)
        res1 = await c1.receive_json_from()
        self.assertEqual(res1["type"], "connection_established")
        self.assertEqual(res1["role"], "partner_1")

        # 2. Partner 2 connects
        c2 = WebsocketCommunicator(application, f"/ws/conflict/{self.session.id}/?token={self.t2}")
        connected2, _ = await c2.connect()
        self.assertTrue(connected2)
        res2 = await c2.receive_json_from()
        self.assertEqual(res2["type"], "connection_established")
        self.assertEqual(res2["role"], "partner_2")

        # --- Phase 1: Individual Chat ---
        # Partner 1 sends a message
        await c1.send_json_to({
            "type": "message.sent",
            "message": "I feel neglected when my partner stays late at work without telling me."
        })
        # Partner 1 receives a private AI followup question
        ai_reply1 = await c1.receive_json_from()
        self.assertEqual(ai_reply1["type"], "message.sent")
        self.assertTrue(ai_reply1["message"]["is_ai"])
        self.assertEqual(ai_reply1["message"]["phase"], "individual")

        # Partner 2 also gets a partner.replied event on their socket
        replied_event = await c2.receive_json_from()
        self.assertEqual(replied_event["type"], "partner.replied")
        self.assertEqual(replied_event["partner_role"], "partner_1")

        # Partner 2 sends a message
        await c2.send_json_to({
            "type": "message.sent",
            "message": "I am working hard to pay off our mortgage. I feel pressured."
        })
        ai_reply2 = await c2.receive_json_from()
        self.assertEqual(ai_reply2["type"], "message.sent")
        self.assertTrue(ai_reply2["message"]["is_ai"])
        
        # Partner 1 gets a partner.replied event
        replied_event_p1 = await c1.receive_json_from()
        self.assertEqual(replied_event_p1["type"], "partner.replied")
        self.assertEqual(replied_event_p1["partner_role"], "partner_2")

        # --- Submit Individual Sides ---
        # Husband submits side
        await c1.send_json_to({"type": "submit_individual_side"})
        submit_reply1 = await c1.receive_json_from()
        self.assertEqual(submit_reply1["type"], "message.sent")
        self.assertEqual(submit_reply1["message"]["status"], "waiting")

        # Wife submits side
        await c2.send_json_to({"type": "submit_individual_side"})
        
        # When both submit, it transitions to cross-referencing and broadcasts prompt.
        # Partner 1 receives cross_referencing update
        status_update1 = await c1.receive_json_from()
        self.assertEqual(status_update1["type"], "session.status.update")
        self.assertEqual(status_update1["status"], "cross_referencing")

        # Partner 2 receives cross_referencing update
        status_update2 = await c2.receive_json_from()
        self.assertEqual(status_update2["type"], "session.status.update")
        self.assertEqual(status_update2["status"], "cross_referencing")

        # --- Phase 2: Cross Reference ---
        # Partner 1 replies to cross reference
        await c1.send_json_to({
            "type": "message.sent",
            "message": "I understand the mortgage pressure, but a simple text warning takes 5 seconds."
        })
        cross_waiting1 = await c1.receive_json_from()
        self.assertEqual(cross_waiting1["type"], "message.sent")
        self.assertEqual(cross_waiting1["message"]["status"], "waiting")

        # Partner 2 receives partner.replied event
        replied_event_c2 = await c2.receive_json_from()
        self.assertEqual(replied_event_c2["type"], "partner.replied")

        # Partner 2 replies to cross reference
        await c2.send_json_to({
            "type": "message.sent",
            "message": "I will try to text more often, but I need them to respect my work boundaries."
        })

        # Since both replied, Phase 3 runs!
        # Partner 1 receives partner.replied event first
        replied_event_c1 = await c1.receive_json_from()
        self.assertEqual(replied_event_c1["type"], "partner.replied")

        # Both partners should receive:
        # 1. ai.analyzing broadcast
        # 2. ai.response.ready broadcast with analysis
        
        analyzing_event1 = await c1.receive_json_from(timeout=60)
        self.assertEqual(analyzing_event1["type"], "ai.analyzing")

        analyzing_event2 = await c2.receive_json_from(timeout=60)
        self.assertEqual(analyzing_event2["type"], "ai.analyzing")

        # Wait for the AI pipeline execution
        analysis_ready1 = await c1.receive_json_from(timeout=60)
        self.assertEqual(analysis_ready1["type"], "ai.response.ready")
        self.assertIn("resolution", analysis_ready1["analysis"])
        self.assertIn("communication_script", analysis_ready1["analysis"])

        analysis_ready2 = await c2.receive_json_from(timeout=60)
        self.assertEqual(analysis_ready2["type"], "ai.response.ready")

        # --- Phase 4: Clarification ---
        # Partner 1 sends a private clarification query
        await c1.send_json_to({
            "type": "message.sent",
            "message": "How can I bring up scheduling without sounding demanding?"
        })
        
        clarification_reply = await c1.receive_json_from()
        self.assertEqual(clarification_reply["type"], "message.sent")
        self.assertEqual(clarification_reply["message"]["phase"], "clarification")
        self.assertTrue(clarification_reply["message"]["is_ai"])

        # Partner 2 does NOT receive this clarification event (it is private!)
        # We ensure no message arrives in c2
        self.assertTrue(await c2.receive_nothing())

        # Clean up
        await c1.disconnect()
        await c2.disconnect()
