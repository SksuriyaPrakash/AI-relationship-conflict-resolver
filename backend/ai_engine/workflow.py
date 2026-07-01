from typing import Dict, Any, TypedDict, List
from langgraph.graph import StateGraph, END

# Define the state matching the Django models and prompt requirements
class ConflictState(TypedDict):
    session_id: str
    husband_messages: List[str]
    wife_messages: List[str]
    match_percentage: int
    severity: str
    conflict_type: str
    root_cause: str
    escalation_flag: bool
    advice_a: str
    advice_b: str
    language: str  # "english" or "tamil"
    current_phase: str

from ai_engine.nodes import (
    escalation_detector,
    cross_reference_analyzer,
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
    workflow.add_node("cross_reference_analyzer", cross_reference_analyzer)

    # Connection flows
    workflow.set_entry_point("escalation_detector")
    
    workflow.add_conditional_edges(
        "escalation_detector",
        check_escalation,
        {
            "escalated": END,
            "clear": "cross_reference_analyzer"
        }
    )
    
    workflow.add_edge("cross_reference_analyzer", END)

    return workflow.compile()

conflict_app = build_graph()
