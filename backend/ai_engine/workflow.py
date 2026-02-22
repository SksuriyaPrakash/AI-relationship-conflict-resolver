from typing import Dict, Any, TypedDict, List
from langgraph.graph import StateGraph, END

# Define the state matching the Django models and prompt requirements
class ConflictState(TypedDict):
    session_id: str
    husband_messages: List[str]
    wife_messages: List[str]
    husband_emotions: Dict[str, float]
    wife_emotions: Dict[str, float]
    conflict_type: str
    root_cause: str
    escalation_flag: bool
    resolution: str
    communication_script: str
    language: str  # "english" or "tamil"
    current_phase: str

from ai_engine.nodes import (
    escalation_detector,
    emotion_analyzer,
    conflict_classifier,
    root_cause_analyzer,
    resolution_generator,
)

def check_escalation(state: ConflictState) -> str:
    if state.get("escalation_flag", False):
        return "escalated"
    return "clear"

def build_graph():
    # Initialize state graph
    workflow = StateGraph(ConflictState)

    # Add Nodes
    workflow.add_node("escalation_detector", escalation_detector)
    workflow.add_node("emotion_analyzer", emotion_analyzer)
    workflow.add_node("conflict_classifier", conflict_classifier)
    workflow.add_node("root_cause_analyzer", root_cause_analyzer)
    workflow.add_node("resolution_generator", resolution_generator)

    # Connection flows
    workflow.set_entry_point("escalation_detector")
    
    workflow.add_conditional_edges(
        "escalation_detector",
        check_escalation,
        {
            "escalated": END,
            "clear": "emotion_analyzer"
        }
    )
    
    workflow.add_edge("emotion_analyzer", "conflict_classifier")
    workflow.add_edge("conflict_classifier", "root_cause_analyzer")
    workflow.add_edge("root_cause_analyzer", "resolution_generator")
    workflow.add_edge("resolution_generator", END)

    return workflow.compile()

conflict_app = build_graph()
