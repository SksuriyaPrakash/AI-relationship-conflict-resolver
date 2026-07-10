import json
import logging
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from django.db.models import Q
from django.conf import settings
from .models import ConflictSession, ChatMessage, AIAnalysisResult, ProgressLog
from users.models import CoupleProfile
from ai_engine.nodes import get_llm
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
        
        if not self.session:
            # Add debug logging to see WHY the session is missing
            import logging
            logger = logging.getLogger(__name__)
            logger.error(f"WebSocket session lookup failed for session_id: {self.session_id}. User: {self.user.username}")
            
            await self.send_json({
                "type": "error", 
                "message": f"Session no longer exists. (Debug ID: {self.session_id})"
            })
            await self.close(code=4004)
            return

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

            # Check if user already submitted their individual perspective
            if phase == "individual":
                p1_sub, p2_sub = await self.get_submission_statuses(self.session)
                if (self.role == "partner_1" and p1_sub) or (self.role == "partner_2" and p2_sub):
                    await self.send_json({
                        "type": "error",
                        "message": "You have already submitted your perspective. Please wait for your partner."
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
                # Auto-submit individual side immediately after saving the message
                await self.handle_submit_side()
            
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
        import time
        user_msgs = await self.get_user_messages_in_phase(self.session, self.user, "individual")
        llm = get_llm()
        text = " | ".join(user_msgs)
        language = self.user.language_preference
        u_name = self.user.first_name or self.user.username
        u_gender = self.user.gender or "unknown gender"
        prompt = [
            SystemMessage(content=(
                f"You are a supportive relationship counselor. You are talking privately to {u_name} ({u_gender}), who is explaining a conflict. "
                f"Ask exactly one gentle, open-ended question to help them elaborate on their feelings or the situation. "
                f"Address them directly by their name. Response MUST be in {language}."
            )),
            HumanMessage(content=f"{u_name} says: {text}")
        ]

        msg_id = f"ai-ind-{self.user.id}-{int(time.time())}"
        await self.send_json({
            "type": "stream.start",
            "message_id": msg_id,
            "phase": "individual"
        })

        ai_reply = ""
        try:
            if hasattr(llm, "astream"):
                async for chunk in llm.astream(prompt):
                    if chunk.content:
                        ai_reply += chunk.content
                        await self.send_json({
                            "type": "stream.chunk",
                            "message_id": msg_id,
                            "chunk": chunk.content
                        })
            else:
                response = await database_sync_to_async(llm.invoke)(prompt)
                ai_reply = response.content
                await self.send_json({"type": "stream.chunk", "message_id": msg_id, "chunk": ai_reply})
        except Exception as e:
            logger.error(f"Streaming error in individual chat: {e}")
            ai_reply = "Can you tell me more about how that made you feel?" if language == "english" else "அதைப்பற்றி இன்னும் கொஞ்சம் விரிவாகக் கூற முடியுமா?"
            await self.send_json({"type": "stream.chunk", "message_id": msg_id, "chunk": ai_reply})

        await self.send_json({"type": "stream.end", "message_id": msg_id})

        # Save AI reply directed to this user
        await self.save_message(
            session=self.session,
            sender=self.user,  # Associate with sender for private history lookup
            message=ai_reply.strip(),
            is_ai=True,
            phase="individual",
            status="sent",
            visible_to=self.user
        )

    async def handle_submit_side(self):
        logger.info(f"[DEBUG] handle_submit_side called for user={self.user.username}, role={self.role}, session={self.session.id}")
        
        # Set submission status for the user
        await self.mark_side_submitted(self.session, self.role)
        logger.info(f"[DEBUG] mark_side_submitted finished for role={self.role}")
        
        # Check if the other partner has already submitted
        is_p1_submitted, is_p2_submitted = await self.get_submission_statuses(self.session)
        logger.info(f"[DEBUG] get_submission_statuses returned p1={is_p1_submitted}, p2={is_p2_submitted}")

        # Update progress percentage
        progress_pct = 10
        if is_p1_submitted or is_p2_submitted:
            progress_pct = 20
        if is_p1_submitted and is_p2_submitted:
            progress_pct = 30
        await self.update_progress(self.session, progress_pct, f"Partner submitted individual side. Progress: {progress_pct}%")

        if is_p1_submitted and is_p2_submitted:
            # Both submitted! Transition directly to analyzing phase
            await self.update_session_status(self.session, "analyzing")
            await self.update_progress(self.session, 75, "Both partners completed individual sides. Running AI analysis.")
            
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
        p1 = self.session.couple.partner_1
        p2 = self.session.couple.partner_2
        p1_msgs = await self.get_all_user_messages(self.session, p1)
        p2_msgs = await self.get_all_user_messages(self.session, p2)
        
        p1_name = p1.first_name or p1.username
        p1_gender = p1.gender or "unknown gender"
        p2_name = p2.first_name or p2.username
        p2_gender = p2.gender or "unknown gender"

        # Detect primary language based on p1 or fallback
        pref_lang = p1.language_preference

        inputs = {
            "session_id": str(self.session.id),
            "husband_messages": p1_msgs,
            "wife_messages": p2_msgs,
            "language": pref_lang,
        }

        # Broadcast analyzing status
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "broadcast_analyzing",
                "status": "analyzing"
            }
        )

        from ai_engine.nodes import escalation_detector, cross_reference_analyzer
        import time
        from langchain_core.messages import SystemMessage, HumanMessage
        from ai_engine.nodes import get_llm

        # 1. Run quick escalation check
        try:
            escalation_result = await database_sync_to_async(escalation_detector)(inputs)
        except Exception as e:
            logger.error(f"Escalation check error: {e}")
            escalation_result = {"escalation_flag": False}

        if escalation_result.get("escalation_flag", False):
            await self.update_session_status(self.session, "escalated")
            await self.update_progress(self.session, 100, "Safety alert triggered. Professional support resources provided.")
            
            await self.save_analysis_result(self.session, {"severity": "critical", "root_cause": "Safety Escalation"}, is_escalated=True)
            
            warning_msg = (
                "🚨 SAFETY ALERT: Out-of-bounds safety check triggered. "
                "For your safety, chat has been escalated. "
                "If you are in immediate danger, call 911 or visit https://www.thehotline.org/ (National Domestic Violence Hotline)."
            ) if pref_lang == "english" else (
                "🚨 பாதுகாப்பு எச்சரிக்கை: பாதுகாப்பு மீறல் கண்டறியப்பட்டது. "
                "உங்கள் பாதுகாப்பிற்காக, உரையாடல் நிறுத்தப்பட்டுள்ளது. "
                "உடனடி ஆபத்து இருந்தால் அவசர உதவி எண்களைத் தொடர்பு கொள்ளவும்."
            )

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

        # 2. Start ChatGPT-like live streaming of the conversational analysis!
        msg_id = f"ai-res-{self.session.id}-{int(time.time())}"
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "broadcast_stream_start",
                "message_id": msg_id,
                "phase": "analyzing"
            }
        )

        llm = get_llm()
        prompt = [
            SystemMessage(content=f"You are a professional, empathetic marriage therapist. Read the accounts from {p1_name} ({p1_gender}) and {p2_name} ({p2_gender}). Speak directly to them in {pref_lang} using their actual names. Acknowledge both of their feelings fairly, provide a thoughtful and highly personalized analysis of the root cause unique to their situation, and suggest a constructive resolution. Keep your response short, sweet, and strictly under 150 words. Format your response beautifully using Markdown (bolding key terms, using line breaks or bullet points). Do NOT use generic terms like 'Partner 1' or 'Person A'."),
            HumanMessage(content=f"{p1_name} says: {' '.join(p1_msgs)}\n{p2_name} says: {' '.join(p2_msgs)}")
        ]
        
        analysis_text = ""
        try:
            if hasattr(llm, "astream"):
                async for chunk in llm.astream(prompt):
                    if chunk.content:
                        analysis_text += chunk.content
                        await self.channel_layer.group_send(
                            self.room_group_name,
                            {
                                "type": "broadcast_stream_chunk",
                                "message_id": msg_id,
                                "chunk": chunk.content
                            }
                        )
            else:
                response = await database_sync_to_async(llm.invoke)(prompt)
                analysis_text = response.content
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "broadcast_stream_chunk",
                        "message_id": msg_id,
                        "chunk": analysis_text
                    }
                )
        except Exception as e:
            logger.error(f"Error streaming AI analysis: {e}")
            analysis_text = "I'm sorry, I encountered an error while analyzing your perspectives. Please try again later."
            await self.channel_layer.group_send(
                self.room_group_name,
                {"type": "broadcast_stream_chunk", "message_id": msg_id, "chunk": analysis_text}
            )

        # 3. Silently get structured JSON metrics in background for database
        try:
            result = await database_sync_to_async(cross_reference_analyzer)(inputs)
        except Exception as e:
            logger.error(f"Error in cross_reference_analyzer: {e}")
            result = {"match_percentage": 50, "severity": "medium", "root_cause": "Analysis failed"}

        match_pct = result.get("match_percentage", 50)
        
        if match_pct < 75:
            # Increment mismatch count and handle retry or escalation
            self.session.mismatch_count += 1
            await database_sync_to_async(self.session.save)()
            
            if self.session.mismatch_count >= 3:
                await self.update_session_status(self.session, "escalated")
                await self.update_progress(self.session, 100, "Multiple mismatches. Escalated to professional.")
                await self.save_analysis_result(self.session, result, is_escalated=True)
                
                warning_msg = "We couldn't align your perspectives after several tries. Please consult a professional therapist."
                await self.save_message(self.session, self.session.couple.partner_1, warning_msg, is_ai=True, phase="cross_ref")
                await self.save_message(self.session, self.session.couple.partner_2, warning_msg, is_ai=True, phase="cross_ref")
                
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "broadcast_escalated",
                        "message": warning_msg
                    }
                )
            else:
                await self.update_session_status(self.session, "cross_referencing")
                retry_msg = "Your perspectives didn't match closely enough. Please re-elaborate and clarify your stance."
                await self.save_message(self.session, self.session.couple.partner_1, retry_msg, is_ai=True, phase="cross_ref")
                await self.save_message(self.session, self.session.couple.partner_2, retry_msg, is_ai=True, phase="cross_ref")
                
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "session.status.update",
                        "status": "cross_referencing",
                        "system_message": retry_msg
                    }
                )
            return

        await self.update_session_status(self.session, "analyzing")

        # Determine points deduction
        severity = result.get("severity", "low").lower()
        deduction = 0
        if severity == "critical": deduction = -20
        elif severity == "high": deduction = -15
        elif severity == "medium": deduction = -10
        elif severity == "low": deduction = -5
        
        await self.update_progress(self.session, deduction, f"Severity scoring ({severity}) applied.")
        
        # We broadcast the start of the stream for the resolution
        msg_id = f"ai-res-{self.session.id}-{int(time.time())}"
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "broadcast_stream_start",
                "message_id": msg_id
            }
        )

        llm = get_llm()
        husband_txt = " ".join(p1_msgs)
        wife_txt = " ".join(p2_msgs)
        prompt = [
            SystemMessage(content=(
                f"You are a compassionate relationship counselor treating {p1_name} ({p1_gender}) and {p2_name} ({p2_gender}). Based on the conflict analysis, "
                f"write a highly personalized, short, and direct resolution message in {pref_lang} addressing both of them directly by their names. "
                "Explain the issue gently like a real doctor, encourage empathy for the opposite side, and give a unified way forward tailored specifically to their unique situation. "
                "Strictly keep your response under 150 words. Format your response beautifully using Markdown (bolding key terms, using line breaks or bullet points). Do NOT use terms like 'Partner 1' or 'Partner 2'. "
                "At the very end of your response, you MUST ask exactly: 'Would you like some suggestions or tips to solve this further?'"
            )),
            HumanMessage(content=(
                f"Conflict Type: {result.get('conflict_type', 'communication')}\n"
                f"Root Cause: {result.get('root_cause', 'Misunderstanding')}\n"
                f"{p1_name} said: {husband_txt}\n"
                f"{p2_name} said: {wife_txt}\n"
                "Please provide the concise, unique final resolution guidance."
            ))
        ]

        resolution_text = ""
        try:
            if hasattr(llm, "astream"):
                async for chunk in llm.astream(prompt):
                    if chunk.content:
                        resolution_text += chunk.content
                        await self.channel_layer.group_send(
                            self.room_group_name,
                            {
                                "type": "broadcast_stream_chunk",
                                "message_id": msg_id,
                                "chunk": chunk.content
                            }
                        )
            else:
                response = await database_sync_to_async(llm.invoke)(prompt)
                resolution_text = response.content
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "broadcast_stream_chunk",
                        "message_id": msg_id,
                        "chunk": resolution_text
                    }
                )
        except Exception as e:
            logger.error(f"Streaming error in resolution: {e}")
            resolution_text = "Based on our analysis, communication is key. Listen to each other."
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "broadcast_stream_chunk",
                    "message_id": msg_id,
                    "chunk": resolution_text
                }
            )

        result["resolution"] = resolution_text.strip()

        # Update session status to resolved in DB
        await self.update_session_status(self.session, "resolved")

        # Save the resolution as a chat message so it persists in history
        await self.save_message(
            session=self.session,
            sender=self.session.couple.partner_1,  # Sender doesn't matter much for AI broadcast
            message=result["resolution"],
            is_ai=True,
            phase="cross_ref",
            status="sent"
        )

        # Save AI analysis result model
        analysis_obj = await self.save_analysis_result(
            session=self.session,
            result=result,
            is_escalated=False
        )

        # Personalized Advice (private) is stored in AIAnalysisResult
        # We no longer save it as a ChatMessage to prevent it from cluttering the main chat timeline
        advice_a = result.get("advice_a", "")
        advice_b = result.get("advice_b", "")

        # Broadcast the resolution results to both clients
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "broadcast_analysis_ready",
                "message_id": msg_id,
                "analysis": {
                    "match_percentage": match_pct,
                    "severity": severity,
                    "conflict_type": result.get("conflict_type", ""),
                    "root_cause": result.get("root_cause", ""),
                    "resolution": result.get("resolution", ""),
                }
            }
        )

    async def handle_clarification_response(self, message_text):
        import time
        msg_id = f"ai-clarify-{self.user.id}-{int(time.time())}"
        await self.send_json({
            "type": "stream.start",
            "message_id": msg_id,
            "phase": "clarification"
        })

        try:
            analysis_data = await self.get_analysis_context(self.session)
            llm = get_llm()
            language = self.user.language_preference
            prompt = [
                SystemMessage(content=(
                    "You are a supportive relationship counselor. The couple has just received an analysis of their conflict. "
                    f"Here is the context of their conflict analysis:\n{analysis_data}\n"
                    "Answer the user's follow-up or clarification question privately and empathetically. "
                    f"Response MUST be in {language}."
                )),
                HumanMessage(content=message_text)
            ]

            ai_reply = ""
            if hasattr(llm, "astream"):
                async for chunk in llm.astream(prompt):
                    if chunk.content:
                        ai_reply += chunk.content
                        await self.send_json({
                            "type": "stream.chunk",
                            "message_id": msg_id,
                            "chunk": chunk.content
                        })
            else:
                response = await database_sync_to_async(llm.invoke)(prompt)
                ai_reply = response.content
                await self.send_json({"type": "stream.chunk", "message_id": msg_id, "chunk": ai_reply})

        except Exception as e:
            logger.error(f"Error in clarification streaming: {e}")
            await self.delete_latest_clarification_message(self.session, self.user)
            await self.send_json({
                "type": "error",
                "message": f"AI Engine Error: {str(e)}",
                "action": "restore_input"
            })
            return

        # Save AI reply private to sender
        await self.save_message(
            session=self.session,
            sender=self.user,
            message=ai_reply.strip(),
            is_ai=True,
            phase="clarification",
            status="sent",
            visible_to=self.user
        )

    # --- Channel Event Broadcast Handlers ---

    async def broadcast_error(self, event):
        await self.send_json({
            "type": "error",
            "message": event["message"],
            "action": event.get("action")
        })

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
        payload = {
            "type": "ai.response.ready",
            "analysis": event["analysis"]
        }
        if "message_id" in event:
            payload["message_id"] = event["message_id"]
        await self.send_json(payload)

    async def broadcast_stream_start(self, event):
        await self.send_json({
            "type": "stream.start",
            "message_id": event["message_id"]
        })

    async def broadcast_stream_chunk(self, event):
        await self.send_json({
            "type": "stream.chunk",
            "message_id": event["message_id"],
            "chunk": event["chunk"]
        })

    async def session_status_update(self, event):
        await self.send_json({
            "type": "session.status.update",
            "status": event.get("status"),
            "system_message": event.get("system_message", "")
        })

    async def broadcast_status(self, event):
        await self.send_json({
            "type": "session.status.update",
            "status": event.get("status"),
            "system_message": event.get("system_message", "")
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
        if session.couple.partner_1_id == user.id:
            return "partner_1"
        return "partner_2"

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
            if m.visible_to:
                if m.visible_to == user:
                    is_visible = True
            else:
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
    def delete_latest_messages_in_phase(self, session, phase):
        latest_p1 = ChatMessage.objects.filter(session=session, sender=session.couple.partner_1, is_ai=False, phase=phase).order_by('-timestamp').first()
        if latest_p1:
            latest_p1.delete()
            
        latest_p2 = ChatMessage.objects.filter(session=session, sender=session.couple.partner_2, is_ai=False, phase=phase).order_by('-timestamp').first()
        if latest_p2:
            latest_p2.delete()

    @database_sync_to_async
    def delete_latest_clarification_message(self, session, sender):
        latest = ChatMessage.objects.filter(session=session, sender=sender, is_ai=False, phase="clarification").order_by('-timestamp').first()
        if latest:
            latest.delete()

    @database_sync_to_async
    def save_message(self, session, sender, message, is_ai, phase, status="sent", visible_to=None):
        return ChatMessage.objects.create(
            session=session,
            sender=sender,
            message=message,
            is_ai=is_ai,
            phase=phase,
            status=status,
            visible_to=visible_to
        )

    @database_sync_to_async
    def save_private_message(self, session, user, message, phase):
        return ChatMessage.objects.create(
            session=session,
            sender=user,
            visible_to=user,
            message=message,
            is_ai=True,
            phase=phase,
            status="sent"
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
                "husband_emotions": {},
                "wife_emotions": {},
                "conflict_type": result.get("conflict_type", "communication"),
                "root_cause": result.get("root_cause", ""),
                "resolution": "",
                "communication_script": "",
                "match_percentage": result.get("match_percentage", 0),
                "severity": result.get("severity", "low"),
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
