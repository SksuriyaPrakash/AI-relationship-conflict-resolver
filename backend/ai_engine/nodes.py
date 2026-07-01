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
        else:
            # Resolution generation (mock JSON)
            return HumanMessage(content=json.dumps({
                "match_percentage": 80,
                "severity": "low",
                "conflict_type": "communication",
                "root_cause": "Misaligned communication channels and expectations.",
                "advice_a": "Listen to your partner without interrupting.",
                "advice_b": "Express your feelings calmly using 'I' statements."
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

# Node 1: escalation_detector
def escalation_detector(state: Dict[str, Any]) -> Dict[str, Any]:
    # Collect all messages
    all_msgs = state.get("husband_messages", []) + state.get("wife_messages", [])
    combined_text = " ".join(all_msgs)
    
    # Semantic Gemini Context Verification for Abuse/Safety Check
    llm = get_llm()
    prompt = [
        SystemMessage(content=(
            "You are a safety detection system for a couples therapy bot. "
            "Analyze the messages and use your semantic understanding to verify if either message contains "
            "signs of physical abuse, severe violence, suicide threats, or serious safety issues. "
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

# Node 2: cross_reference_analyzer
def cross_reference_analyzer(state: Dict[str, Any]) -> Dict[str, Any]:
    llm = get_llm()
    
    husband_txt = " ".join(state.get("husband_messages", []))
    wife_txt = " ".join(state.get("wife_messages", []))
    language = state.get("language", "english")
    
    prompt = [
        SystemMessage(content=(
            f"You are a professional marriage therapist. Read both partners' accounts of a conflict and cross-reference them. "
            "Use semantic comparison (meaning-based) to determine their match percentage. "
            "Give a severity classification based on this fixed reference table:\n"
            "- critical (hitting, abuse, cheating)\n"
            "- high (lying, broken trust, major fight)\n"
            "- medium (ignoring, broken promises)\n"
            "- low (lateness, small misunderstanding)\n\n"
            f"Provide your advice in {language}. Provide personalized advice for each person.\n"
            "Return ONLY valid JSON with exactly the following keys, no markdown blocks:\n"
            "{\n"
            '  "match_percentage": <integer 0-100>,\n'
            '  "severity": "<critical|high|medium|low>",\n'
            '  "conflict_type": "<short description>",\n'
            '  "root_cause": "<detailed root cause>",\n'
            '  "advice_a": "<advice for Person A>",\n'
            '  "advice_b": "<advice for Person B>"\n'
            "}"
        )),
        HumanMessage(content=f"Person A said: \"{husband_txt}\"\nPerson B said: \"{wife_txt}\"")
    ]
    
    try:
        response = llm.invoke(prompt)
        clean_content = response.content.replace("```json", "").replace("```", "").strip()
        data = json.loads(clean_content)
    except Exception as e:
        # Fallback response
        data = {
            "match_percentage": 50,
            "severity": "medium",
            "conflict_type": "communication",
            "root_cause": "System failed to analyze.",
            "advice_a": "Please communicate openly.",
            "advice_b": "Please communicate openly."
        }
            
    return {
        "match_percentage": data.get("match_percentage", 50),
        "severity": data.get("severity", "medium"),
        "conflict_type": data.get("conflict_type", "communication"),
        "root_cause": data.get("root_cause", "Miscommunication."),
        "advice_a": data.get("advice_a", ""),
        "advice_b": data.get("advice_b", "")
    }
