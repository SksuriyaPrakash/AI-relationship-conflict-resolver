import os
import json
from typing import Dict, List, Any
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage
from .rag_store import rag_store

# Mock LLM for local development when GEMINI_API_KEY is not set
class MockLLM:
    def __init__(self, model_name="mock-gemini-pro"):
        self.model_name = model_name

    def invoke(self, messages):
        content = ""
        for m in messages:
            content += str(m.content) + "\n"
        
        content_lower = content.lower()
        
        if "escalation" in content_lower or "safety check" in content_lower:
            # Check if actual escalation words are in the message
            # For mock testing: if 'kill' or 'violence' is in prompt, return true
            if any(k in content_lower for k in ["kill", "violence", "abuse", "suicide", "கொலை"]):
                return HumanMessage(content="true")
            return HumanMessage(content="false")
            
        elif "emotion" in content_lower or "extract emotions" in content_lower:
            # Return json mapping emotions to intensity
            return HumanMessage(content=json.dumps({
                "frustration": 7.0,
                "anxiety": 5.0,
                "sadness": 4.0,
                "hopeful": 2.0
            }))
            
        elif "classify" in content_lower or "conflict type" in content_lower:
            return HumanMessage(content="communication")
            
        elif "paraphrase" in content_lower or "perspective" in content_lower:
            return HumanMessage(content="Partner feels unheard and overwhelmed due to lack of coordination on shared responsibilities.")
            
        elif "root cause" in content_lower:
            return HumanMessage(content="Misaligned communication channels and expectations regarding household workload and support systems.")
            
        else:
            # Resolution generation
            return HumanMessage(content=json.dumps({
                "resolution": "1. Schedule a weekly sync-up to organize chore distributions.\n2. Express appreciation for daily tasks.\n3. Take breaks during discussions if emotions run high.",
                "communication_script": "I feel overwhelmed with chores. Can we plan our tasks together this weekend so I feel more supported?"
            }))

def get_llm():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return MockLLM()
    return ChatGoogleGenerativeAI(
        model="gemini-1.5-pro",
        google_api_key=api_key,
        temperature=0.2
    )

# Node 5: escalation_detector (HYBRID)
# We place this first or run it as Node 1 for safety
def escalation_detector(state: Dict[str, Any]) -> Dict[str, Any]:
    keywords = ["abuse", "hit", "violence", "suicide", "disappear", "hurt", "kill", "scared", "trapped", "கொலை", "அடிக்கிறான்", "பயமா இருக்கு"]
    
    # Collect all messages
    all_msgs = state.get("husband_messages", []) + state.get("wife_messages", [])
    combined_text = " ".join(all_msgs).lower()
    
    # Layer 1: Keyword Check
    keyword_triggered = any(k in combined_text for k in keywords)
    
    if not keyword_triggered:
        return {"escalation_flag": False}
        
    # Layer 2: Gemini Context Verification
    llm = get_llm()
    prompt = [
        SystemMessage(content=(
            "You are an escalation detection safety system for a couples therapy bot. "
            "Analyze the messages and verify if there is an active threat of abuse, physical violence, "
            "suicide, or immediate danger. "
            "Reply with exactly 'true' or 'false'."
        )),
        HumanMessage(content=f"Analyze these messages:\n{combined_text}")
    ]
    
    try:
        response = llm.invoke(prompt)
        result_text = response.content.strip().lower()
        is_escalated = "true" in result_text
    except Exception:
        is_escalated = True  # Fallback to safe flag on error

    return {"escalation_flag": is_escalated}

# Node 1: emotion_analyzer
def emotion_analyzer(state: Dict[str, Any]) -> Dict[str, Any]:
    llm = get_llm()
    
    def analyze_messages(msgs):
        if not msgs:
            return {}
        text = " | ".join(msgs)
        prompt = [
            SystemMessage(content=(
                "Analyze the user's relationship conflict messages. Extract the key emotions, tone, and intensity (1-10). "
                "Output the results in raw JSON format (e.g. {'anger': 8.0, 'sadness': 5.0}). No formatting markdown."
            )),
            HumanMessage(content=text)
        ]
        try:
            response = llm.invoke(prompt)
            # Remove any markdown backticks from JSON if returned
            clean_content = response.content.replace("```json", "").replace("```", "").strip()
            return json.loads(clean_content)
        except Exception:
            return {"frustration": 5.0}  # Fallback

    husband_emotions = analyze_messages(state.get("husband_messages", []))
    wife_emotions = analyze_messages(state.get("wife_messages", []))
    
    return {
        "husband_emotions": husband_emotions,
        "wife_emotions": wife_emotions
    }

# Node 2: conflict_classifier
def conflict_classifier(state: Dict[str, Any]) -> Dict[str, Any]:
    llm = get_llm()
    husband_txt = " ".join(state.get("husband_messages", []))
    wife_txt = " ".join(state.get("wife_messages", []))
    current_conflict_desc = f"Husband: {husband_txt}\nWife: {wife_txt}"
    
    # ChromaDB RAG: Find similar past conflicts
    rag_context = ""
    try:
        similar = rag_store.find_similar_conflicts(current_conflict_desc, limit=2)
        if similar:
            rag_context = "\nSimilar past cases:\n" + "\n".join(
                [f"- Issue: {c['root_cause']}\n  Resolution: {c['resolution']}" for c in similar]
            )
    except Exception:
        pass  # Fail gracefully if ChromaDB is empty or fails
        
    prompt = [
        SystemMessage(content=(
            "Classify the couples conflict into one of: "
            "communication, trust, boundary, jealousy, financial, intimacy, other. "
            f"Use similar past resolutions context if helpful:\n{rag_context}\n"
            "Return only the classification category word in lowercase (e.g. communication)."
        )),
        HumanMessage(content=f"Current Issue:\n{current_conflict_desc}")
    ]
    
    try:
        response = llm.invoke(prompt)
        conflict_type = response.content.strip().lower()
    except Exception:
        conflict_type = "communication"
        
    return {"conflict_type": conflict_type}

# Node 3: perspective_generator
def generate_paraphrased_perspective(message_history: List[str], target_language: str = "english") -> str:
    """
    Helper function (can be called as node or standalone) to paraphrase a partner's view
    for cross-referencing.
    """
    llm = get_llm()
    text = " | ".join(message_history)
    prompt = [
        SystemMessage(content=(
            "Paraphrase the partner's messages neutrally. Summarize what they feel and what they want. "
            "DO NOT use exact quotes. Be empathetic. "
            f"Response MUST be in {target_language}."
        )),
        HumanMessage(content=text)
    ]
    try:
        response = llm.invoke(prompt)
        return response.content.strip()
    except Exception:
        return "your partner feels upset about recent events and wants to discuss things calmly."

# Node 4: root_cause_analyzer
def root_cause_analyzer(state: Dict[str, Any]) -> Dict[str, Any]:
    llm = get_llm()
    husband_txt = " ".join(state.get("husband_messages", []))
    wife_txt = " ".join(state.get("wife_messages", []))
    
    prompt = [
        SystemMessage(content=(
            "You are a professional marriage therapist. Read the views of both partners and identify "
            "the deep underlying root cause of their conflict (e.g., unmet emotional needs, "
            "unclear boundaries, historical resentment, exhaustion). Be concise."
        )),
        HumanMessage(content=f"Husband's side: {husband_txt}\nWife's side: {wife_txt}")
    ]
    
    try:
        response = llm.invoke(prompt)
        root_cause = response.content.strip()
    except Exception:
        root_cause = "Miscommunication and differences in expectation."
        
    return {"root_cause": root_cause}

# Node 6: resolution_generator
def resolution_generator(state: Dict[str, Any]) -> Dict[str, Any]:
    llm = get_llm()
    
    husband_txt = " ".join(state.get("husband_messages", []))
    wife_txt = " ".join(state.get("wife_messages", []))
    root_cause = state.get("root_cause", "")
    conflict_type = state.get("conflict_type", "")
    language = state.get("language", "english")
    
    prompt = [
        SystemMessage(content=(
            f"You are a marriage therapist. Based on the conflict type '{conflict_type}' and root cause '{root_cause}', "
            "generate a dual resolution plan. "
            "1. Step by step constructive resolution advice.\n"
            "2. A communication script (exact practical words they can say to each other to initiate healing).\n"
            f"The entire output MUST be in the preferred language: {language}.\n"
            "Respond in JSON format with keys 'resolution' and 'communication_script'. No formatting markdown."
        )),
        HumanMessage(content=f"Husband: {husband_txt}\nWife: {wife_txt}")
    ]
    
    try:
        response = llm.invoke(prompt)
        clean_content = response.content.replace("```json", "").replace("```", "").strip()
        data = json.loads(clean_content)
        resolution = data.get("resolution", "")
        communication_script = data.get("communication_script", "")
    except Exception:
        if language == "tamil":
            resolution = "தயவுசெய்து ஒருவரையொருவர் கவனித்துக் கொள்ளுங்கள்."
            communication_script = "\"நான் உன்னை நேசிக்கிறேன், இதை நாம் இணைந்து தீர்ப்போம்.\""
        else:
            resolution = "Please spend quiet, dedicated time listening to each other's needs without judgment."
            communication_script = "\"I appreciate your perspective, and I want us to work together to find a solution.\""
            
    return {
        "resolution": resolution,
        "communication_script": communication_script
    }
