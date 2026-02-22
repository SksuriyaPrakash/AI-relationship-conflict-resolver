import os
import chromadb
from chromadb.config import Settings

# Default DB path, can be overridden by environment
CHROMA_DB_PATH = os.getenv('CHROMA_DB_PATH', './chroma_db')

class RAGStore:
    def __init__(self):
        # Create persistent directory
        os.makedirs(CHROMA_DB_PATH, exist_ok=True)
        self.client = chromadb.PersistentClient(path=CHROMA_DB_PATH)
        self.collection = self.client.get_or_create_collection(
            name="conflict_resolutions",
            metadata={"hnsw:space": "cosine"}
        )

    def add_resolved_conflict(self, session_id, root_cause, resolution, conflict_type):
        """
        Store a resolved conflict description and its resolution details for future RAG queries.
        """
        self.collection.add(
            documents=[root_cause],
            metadatas=[{
                "session_id": str(session_id),
                "resolution": resolution,
                "conflict_type": conflict_type
            }],
            ids=[str(session_id)]
        )

    def find_similar_conflicts(self, current_issue, limit=2):
        """
        Find past similar conflicts using vector similarity search.
        """
        results = self.collection.query(
            query_texts=[current_issue],
            n_results=limit
        )
        similar_cases = []
        if results and 'documents' in results and results['documents']:
            docs = results['documents'][0]
            metas = results['metadatas'][0] if 'metadatas' in results and results['metadatas'] else []
            for doc, meta in zip(docs, metas):
                similar_cases.append({
                    "root_cause": doc,
                    "resolution": meta.get("resolution", ""),
                    "conflict_type": meta.get("conflict_type", "")
                })
        return similar_cases

# Singleton instance
rag_store = RAGStore()
