import json
import logging
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from django.db.models import Q
from django.conf import settings
from .models import ConflictSession, ChatMessage, AIAnalysisResult, ProgressLog
from users.models import CoupleProfile
from ai_engine.nodes import generate_paraphrased_perspective, get_llm
from ai_engine.workflow import conflict_app
from ai_engine.rag_store import rag_store
from langchain_core.messages import SystemMessage, HumanMessage

logger = logging.getLogger(__name__)
User = get_user_model()

def query_individual_chat_followup(messages_list, language="english"):
    llm = get_llm()
    text = " | ".join(messages_list)
    prompt = [
        SystemMessage(content=(
            "You are a supportive relationship counselor. The user is explaining a conflict they are facing with their partner. "
            "Ask exactly one gentle, open-ended question to help them elaborate on their feelings or the situation. "
            f"Response MUST be in {language}."
        )),
        HumanMessage(content=text)
    ]
    try:
        response = llm.invoke(prompt)
        return response.content.strip()
    except Exception as e:
        logger.error(f"Error in query_individual_chat_followup: {e}")
        return "Can you tell me more about how that made you feel?" if language == "english" else "அதைப்பற்றி இன்னும் கொஞ்சம் விரிவாகக் கூற முடியுமா?"

def query_clarification_followup(session_context, new_question, language="english"):
    llm = get_llm()
    prompt = [
        SystemMessage(content=(
            "You are a supportive relationship counselor. The couple has just received an analysis of their conflict. "
            f"Here is the context of their conflict analysis:\n{session_context}\n"
            "Answer the user's follow-up or clarification question privately and empathetically. "
            f"Response MUST be in {language}."
        )),
        HumanMessage(content=new_question)
    ]
    try:
        response = llm.invoke(prompt)
        return response.content.strip()
    except Exception as e:
        logger.error(f"Error in query_clarification_followup: {e}")
        return "I understand this is difficult. Let's look at how we can address this." if language == "english" else "நான் இதை புரிந்து கொள்கிறேன். இதை எவ்வாறு அணுகலாம் என்று பார்ப்போம்."

class ConflictConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.session_id = self.scope['url_route']['kwargs']['session_id']
        self.room_group_name = f"conflict_{self.session_id}"
        self.user = self.scope.get('user')

        if not self.user or self.user.is_anonymous:
            await self.close(code=4001)  # Unauthorized
            return

        # Verify session and couple profile relationship
        self.session = await self.get_session(self.session_id)
        if not self.session:
            await self.close(code=4004)  # Not Found
            return

        is_member = await self.check_session_membership(self.session, self.user)
        if not is_member:
            await self.close(code=4003)  # Forbidden
            return

        # Determine if user is partner 1 or partner 2
        self.role = await self.get_user_role(self.session, self.user)

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

        # Send current messages history to the user
        history = await self.get_chat_history(self.session, self.user)
        await self.send_json({
            "type": "connection_established",
            "role": self.role,
            "session_status": self.session.status,
            "history": history
        })

    async def disconnect(self, close_code):
        if hasattr(self, 'room_group_name'):
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )

    async def receive_json(self, content):
        event_type = content.get("type")
        
        # Reload session state from DB to get the latest status
        self.session = await self.get_session(self.session_id)

        if event_type == "message.sent":
            message_text = content.get("message")
            if not message_text:
                return

            # Determine the current phase of chat based on session status
            phase = "individual"
            if self.session.status == "cross_referencing":
                phase = "cross_ref"
            elif self.session.status in ["resolved", "escalated"]:
                phase = "clarification"

            # Check if inputs are disabled (during analyzing)
            if self.session.status == "analyzing":
                await self.send_json({
                    "type": "error",
                    "message": "Chat inputs are currently disabled while AI is analyzing the conflict."
                })
                return

            # Save user message to database
            user_msg = await self.save_message(
                session=self.session,
                sender=self.user,
                message=message_text,
                is_ai=False,
                phase=phase,
                status="sent"
            )

            # Broadcast to other partner that a reply has been sent (except private clarification)
            if phase != "clarification":
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "broadcast_partner_replied",
                        "sender_id": self.user.id,
                        "role": self.role
                    }
                )

            # Route message handling depending on the phase
            if phase == "individual":
                # AI responds to the user individually
                await self.handle_individual_chat_response(message_text)
            
            elif phase == "cross_ref":
                # Check if both have completed their cross-referencing replies
                # If so, run the analysis pipeline
                await self.handle_cross_ref_response(message_text)
            
            elif phase == "clarification":
                # Handle follow-up clarification question privately
                await self.handle_clarification_response(message_text)

        elif event_type == "message.read":
            # Update all unread messages from the other partner as read
            await self.mark_messages_as_read(self.session, self.user)
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "broadcast_messages_read",
                    "reader_role": self.role
                }
            )

        elif event_type == "partner.typing":
            is_typing = content.get("typing", False)
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "broadcast_typing",
                    "role": self.role,
                    "typing": is_typing
                }
            )

        elif event_type == "submit_individual_side":
            # Explicit event to submit their individual perspective
            await self.handle_submit_side()

    # --- Real-Time State Handlers ---

    async def handle_individual_chat_response(self, user_message):
        # AI replies to user to dig deeper
        user_msgs = await self.get_user_messages_in_phase(self.session, self.user, "individual")
        ai_reply = await database_sync_to_async(query_individual_chat_followup)(
            messages_list=user_msgs,
            language=self.user.language_preference
        )

        # Save AI reply directed to this user
        await self.save_message(
            session=self.session,
            sender=self.user,  # Associate with sender for private history lookup
            message=ai_reply,
            is_ai=True,
            phase="individual",
            status="sent"
        )

        # Send reply back to user (private)
        await self.send_json({
            "type": "message.sent",
            "message": {
                "message": ai_reply,
                "is_ai": True,
                "phase": "individual",
                "status": "sent"
            }
        })

    async def handle_submit_side(self):
        # Set submission status for the user
        await self.mark_side_submitted(self.session, self.role)
        
        # Check if the other partner has already submitted
        is_p1_submitted, is_p2_submitted = await self.get_submission_statuses(self.session)

        # Update progress percentage
        progress_pct = 10
        if is_p1_submitted or is_p2_submitted:
            progress_pct = 20
        if is_p1_submitted and is_p2_submitted:
            progress_pct = 30
        await self.update_progress(self.session, progress_pct, f"Partner submitted individual side. Progress: {progress_pct}%")

        if is_p1_submitted and is_p2_submitted:
            # Both submitted! Transition to cross_referencing phase
            await self.update_session_status(self.session, "cross_referencing")
            await self.update_progress(self.session, 45, "Entering cross-referencing phase.")
            
            # Generate paraphrased summaries
            p1_msgs = await self.get_user_messages_in_phase(self.session, self.session.couple.partner_1, "individual")
            p2_msgs = await self.get_user_messages_in_phase(self.session, self.session.couple.partner_2, "individual")
            
            p1_paraphrase = await database_sync_to_async(generate_paraphrased_perspective)(p1_msgs, self.session.couple.partner_2.language_preference)
            p2_paraphrase = await database_sync_to_async(generate_paraphrased_perspective)(p2_msgs, self.session.couple.partner_1.language_preference)

            # Send cross reference prompt to partner 1 (about partner 2)
            p1_prompt = f"Your partner feels: '{p2_paraphrase}'. What is your perspective on this?" if self.session.couple.partner_1.language_preference == "english" else f"உங்கள் துணையின் கருத்து: '{p2_paraphrase}'. இதைப் பற்றிய உங்கள் கருத்து என்ன?"
            await self.save_message(self.session, self.session.couple.partner_1, p1_prompt, is_ai=True, phase="cross_ref")

            # Send cross reference prompt to partner 2 (about partner 1)
            p2_prompt = f"Your partner feels: '{p1_paraphrase}'. What is your perspective on this?" if self.session.couple.partner_2.language_preference == "english" else f"உங்கள் துணையின் கருத்து: '{p1_paraphrase}'. இதைப் பற்றிய உங்கள் கருத்து என்ன?"
            await self.save_message(self.session, self.session.couple.partner_2, p2_prompt, is_ai=True, phase="cross_ref")

            # Broadcast session update and prompt messages to both respectively
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "broadcast_cross_ref_started",
                    "p1_prompt": p1_prompt,
                    "p2_prompt": p2_prompt
                }
            )
        else:
            # Only one has submitted.
            await self.send_json({
                "type": "message.sent",
                "message": {
                    "message": "Thank you for submitting your perspective. Waiting for your partner to complete their individual reflection.",
                    "is_ai": True,
                    "phase": "individual",
                    "status": "waiting"
                }
            })

    async def handle_cross_ref_response(self, message_text):
        # Check if both have now responded to cross reference prompts
        p1_replied, p2_replied = await self.get_cross_ref_reply_status(self.session)
        
        if p1_replied and p2_replied:
            # Both replied to cross-reference! Enter Phase 3 analyzing
            await self.update_session_status(self.session, "analyzing")
            await self.update_progress(self.session, 75, "Both partners completed cross-referencing. Running AI analysis.")
            
            # Broadcast analyzing status to block inputs
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "broadcast_analyzing",
                    "status": "analyzing"
                }
            )

            # Trigger LangGraph pipeline
            await self.run_analysis_pipeline()
        else:
            # One replied, waiting for other
            await self.send_json({
                "type": "message.sent",
                "message": {
                    "message": "Thank you for your response. Waiting for your partner to complete their feedback.",
                    "is_ai": True,
                    "phase": "cross_ref",
                    "status": "waiting"
                }
            })

    async def run_analysis_pipeline(self):
        # Retrieve all messages for LangGraph input
        p1_msgs = await self.get_all_user_messages(self.session, self.session.couple.partner_1)
        p2_msgs = await self.get_all_user_messages(self.session, self.session.couple.partner_2)

        # Detect primary language based on p1 or fallback
        pref_lang = self.session.couple.partner_1.language_preference

        # Prepare graph state inputs
        inputs = {
            "session_id": str(self.session.id),
            "husband_messages": p1_msgs,
            "wife_messages": p2_msgs,
            "husband_emotions": {},
            "wife_emotions": {},
            "conflict_type": "",
            "root_cause": "",
            "escalation_flag": False,
            "resolution": "",
            "communication_script": "",
            "language": pref_lang,
            "current_phase": "analyzing"
        }

        # Run pipeline
        try:
            # Run in executor thread pool to avoid blocking the async loop
            result = await database_sync_to_async(conflict_app.invoke)(inputs)
        except Exception as e:
            logger.error(f"Error in LangGraph workflow execution: {e}")
            result = {
                "escalation_flag": False,
                "husband_emotions": {"frustration": 5},
                "wife_emotions": {"frustration": 5},
                "conflict_type": "communication",
                "root_cause": "System failed to analyze, defaulting to fallback.",
                "resolution": "Please talk face-to-face and resolve details calmly.",
                "communication_script": "Let's sit together and work this out."
            }

        # Handle escalation check
        if result.get("escalation_flag", False):
            await self.update_session_status(self.session, "escalated")
            await self.update_progress(self.session, 100, "Safety alert triggered. Professional support resources provided.")
            
            # Save AI Analysis warning record
            await self.save_analysis_result(
                session=self.session,
                result=result,
                is_escalated=True
            )
            
            warning_msg = (
                "🚨 SAFETY ALERT: Out-of-bounds safety check triggered. "
                "For your safety, chat has been escalated. "
                "If you are in immediate danger, call 911 or visit https://www.thehotline.org/ (National Domestic Violence Hotline)."
            ) if pref_lang == "english" else (
                "🚨 பாதுகாப்பு எச்சரிக்கை: பாதுகாப்பு மீறல் கண்டறியப்பட்டது. "
                "உங்கள் பாதுகாப்பிற்காக, உரையாடல் நிறுத்தப்பட்டுள்ளது. "
                "உடனடி ஆபத்து இருந்தால் அவசர உதவி எண்களைத் தொடர்பு கொள்ளவும்."
            )

            # Save warning messages for both
            await self.save_message(self.session, self.session.couple.partner_1, warning_msg, is_ai=True, phase="cross_ref")
            await self.save_message(self.session, self.session.couple.partner_2, warning_msg, is_ai=True, phase="cross_ref")

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "broadcast_escalated",
                    "message": warning_msg
                }
            )
            return

        # Normal successful resolution
        await self.update_session_status(self.session, "resolved")
        await self.update_progress(self.session, 90, "AI analysis complete. Resolution plans issued.")
        
        # Save to vector db (RAG)
        try:
            await database_sync_to_async(rag_store.add_resolved_conflict)(
                session_id=self.session.id,
                root_cause=result.get("root_cause", ""),
                resolution=result.get("resolution", ""),
                conflict_type=result.get("conflict_type", "")
            )
        except Exception as e:
            logger.error(f"Chroma RAG save failed: {e}")

        # Save AI analysis result model
        analysis_obj = await self.save_analysis_result(
            session=self.session,
            result=result,
            is_escalated=False
        )

        # Broadcast the resolution results to both clients
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "broadcast_analysis_ready",
                "analysis": {
                    "husband_emotions": result.get("husband_emotions", {}),
                    "wife_emotions": result.get("wife_emotions", {}),
                    "conflict_type": result.get("conflict_type", ""),
                    "root_cause": result.get("root_cause", ""),
                    "resolution": result.get("resolution", ""),
                    "communication_script": result.get("communication_script", "")
                }
            }
        )

    async def handle_clarification_response(self, message_text):
        # Fetch analysis details for context
        analysis_data = await self.get_analysis_context(self.session)
        
        # Query follow up question response
        ai_reply = await database_sync_to_async(query_clarification_followup)(
            session_context=analysis_data,
            new_question=message_text,
            language=self.user.language_preference
        )

        # Save AI reply private to sender
        await self.save_message(
            session=self.session,
            sender=self.user,
            message=ai_reply,
            is_ai=True,
            phase="clarification",
            status="sent"
        )

        # Send response to user privately
        await self.send_json({
            "type": "message.sent",
            "message": {
                "message": ai_reply,
                "is_ai": True,
                "phase": "clarification",
                "status": "sent"
            }
        })

    # --- Channel Event Broadcast Handlers ---

    async def broadcast_partner_replied(self, event):
        if event["sender_id"] != self.user.id:
            await self.send_json({
                "type": "partner.replied",
                "partner_role": event["role"]
            })

    async def broadcast_typing(self, event):
        if event["role"] != self.role:
            await self.send_json({
                "type": "partner.typing",
                "typing": event["typing"]
            })

    async def broadcast_messages_read(self, event):
        if event["reader_role"] != self.role:
            await self.send_json({
                "type": "message.read",
                "status": "read"
            })

    async def broadcast_cross_ref_started(self, event):
        # Send personalized prompts depending on partner
        prompt = event["p1_prompt"] if self.role == "partner_1" else event["p2_prompt"]
        await self.send_json({
            "type": "session.status.update",
            "status": "cross_referencing",
            "system_message": prompt
        })

    async def broadcast_analyzing(self, event):
        await self.send_json({
            "type": "ai.analyzing",
            "status": event["status"]
        })

    async def broadcast_escalated(self, event):
        await self.send_json({
            "type": "session.status.update",
            "status": "escalated",
            "system_message": event["message"]
        })

    async def broadcast_analysis_ready(self, event):
        await self.send_json({
            "type": "ai.response.ready",
            "analysis": event["analysis"]
        })

    # --- Database Operations (database_sync_to_async wrappers) ---

    @database_sync_to_async
    def get_session(self, session_id):
        try:
            return ConflictSession.objects.select_related('couple', 'couple__partner_1', 'couple__partner_2').get(id=session_id)
        except ConflictSession.DoesNotExist:
            return None

    @database_sync_to_async
    def check_session_membership(self, session, user):
        return session.couple.partner_1 == user or session.couple.partner_2 == user

    @database_sync_to_async
    def get_user_role(self, session, user):
        return "partner_1" if session.couple.partner_1 == user else "partner_2"

    @database_sync_to_async
    def get_chat_history(self, session, user):
        # Retrieve messages for this session
        # Individual & Clarification messages are private: only show if user is sender or it's directed to them
        # Cross_ref is visible to both
        msgs = ChatMessage.objects.filter(session=session).order_by('timestamp')
        history = []
        for m in msgs:
            # Visibility checks
            is_visible = False
            if m.phase == "cross_ref":
                is_visible = True
            elif m.phase in ["individual", "clarification"]:
                if m.sender == user:
                    is_visible = True
            
            if is_visible:
                history.append({
                    "id": m.id,
                    "message": m.message,
                    "is_ai": m.is_ai,
                    "phase": m.phase,
                    "status": m.status,
                    "sender_name": "AI" if m.is_ai else m.sender.username,
                    "timestamp": m.timestamp.isoformat()
                })
        return history

    @database_sync_to_async
    def get_user_messages_in_phase(self, session, user, phase):
        msgs = ChatMessage.objects.filter(
            session=session,
            sender=user,
            is_ai=False,
            phase=phase
        ).order_by('timestamp')
        return [m.message for m in msgs]

    @database_sync_to_async
    def get_all_user_messages(self, session, user):
        msgs = ChatMessage.objects.filter(
            session=session,
            sender=user,
            is_ai=False
        ).order_by('timestamp')
        return [m.message for m in msgs]

    @database_sync_to_async
    def save_message(self, session, sender, message, is_ai, phase, status="sent"):
        return ChatMessage.objects.create(
            session=session,
            sender=sender,
            message=message,
            is_ai=is_ai,
            phase=phase,
            status=status
        )

    @database_sync_to_async
    def mark_side_submitted(self, session, role):
        ProgressLog.objects.get_or_create(
            session=session,
            milestone=f"{role}_submitted"
        )

    @database_sync_to_async
    def get_submission_statuses(self, session):
        p1_submitted = ProgressLog.objects.filter(session=session, milestone="partner_1_submitted").exists()
        p2_submitted = ProgressLog.objects.filter(session=session, milestone="partner_2_submitted").exists()
        return p1_submitted, p2_submitted

    @database_sync_to_async
    def get_cross_ref_reply_status(self, session):
        p1_replied = ChatMessage.objects.filter(session=session, sender=session.couple.partner_1, phase="cross_ref", is_ai=False).exists()
        p2_replied = ChatMessage.objects.filter(session=session, sender=session.couple.partner_2, phase="cross_ref", is_ai=False).exists()
        return p1_replied, p2_replied

    @database_sync_to_async
    def update_session_status(self, session, new_status):
        session.status = new_status
        session.save()

    @database_sync_to_async
    def update_progress(self, session, percentage, milestone):
        ProgressLog.objects.create(
            session=session,
            percentage=percentage,
            milestone=milestone
        )

    @database_sync_to_async
    def mark_messages_as_read(self, session, user):
        ChatMessage.objects.filter(session=session).exclude(sender=user).update(status="read")

    @database_sync_to_async
    def save_analysis_result(self, session, result, is_escalated):
        # Update or create AI analysis result
        obj, _ = AIAnalysisResult.objects.update_or_create(
            session=session,
            defaults={
                "husband_emotions": result.get("husband_emotions", {}),
                "wife_emotions": result.get("wife_emotions", {}),
                "conflict_type": result.get("conflict_type", "communication"),
                "root_cause": result.get("root_cause", ""),
                "resolution": result.get("resolution", ""),
                "communication_script": result.get("communication_script", ""),
                "is_escalated": is_escalated
            }
        )
        return obj

    @database_sync_to_async
    def get_analysis_context(self, session):
        try:
            ar = AIAnalysisResult.objects.get(session=session)
            return f"Conflict Category: {ar.conflict_type}\nRoot Cause: {ar.root_cause}\nRecommended Resolution: {ar.resolution}"
        except AIAnalysisResult.DoesNotExist:
            return "No prior resolution analysis."
