from fastapi import APIRouter
from pydantic import BaseModel

from services.rag_pipeline import RAGPipeline
from services.llm_service import LLMService

router = APIRouter(
    prefix="/api",
    tags=["AI Assistant"]
)


class ChatRequest(BaseModel):
    question: str


pipeline = RAGPipeline()
llm = LLMService()


@router.post("/chat")
async def chat(request: ChatRequest):

    # Search uploaded documents
    results = pipeline.search(request.question)

    # ==========================================
    # CASE 1 : No document found
    # ==========================================

    if not results:

        answer = llm.generate_general_answer(
            request.question
        )

        return {
            "answer": answer,
            "source": "General AI Knowledge",
            "page": None,
            "mode": "general"
        }

    # ==========================================
    # Build document context
    # ==========================================

    context = "\n\n".join(
        item["text"]
        for item in results
    )

    answer = llm.generate_answer(
        request.question,
        context
    )

    # ==========================================
    # CASE 2 : LLM says answer not in document
    # ==========================================

    if answer.strip() == "DOCUMENT_NOT_FOUND":

        answer = llm.generate_general_answer(
            request.question
        )

        return {
            "answer": answer,
            "source": "General AI Knowledge",
            "page": None,
            "mode": "general"
        }

    # ==========================================
    # CASE 3 : Answer found in document
    # ==========================================

    first_result = results[0]

    return {
        "answer": answer,
        "source": first_result["document"],
        "page": first_result["page"],
        "mode": "document"
    }