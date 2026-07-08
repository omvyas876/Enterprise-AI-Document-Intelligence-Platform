import os
from datetime import datetime

from fastapi import APIRouter, HTTPException

from utils.config import Config
from services.rag_pipeline import RAGPipeline

router = APIRouter(
    prefix="/api",
    tags=["Documents"]
)


@router.get("/dashboard")
def dashboard():

    if not os.path.exists(Config.UPLOAD_FOLDER):
        return {
            "total_documents": 0,
            "latest_document": "No Documents",
            "supported_formats": "PDF • DOCX • TXT",
            "ai_status": "Ready"
        }

    files = [
        f for f in os.listdir(Config.UPLOAD_FOLDER)
        if os.path.isfile(os.path.join(Config.UPLOAD_FOLDER, f))
    ]

    latest = "No Documents"

    if files:

        latest = max(
            files,
            key=lambda f: os.path.getmtime(
                os.path.join(Config.UPLOAD_FOLDER, f)
            )
        )

    return {
        "total_documents": len(files),
        "latest_document": latest,
        "supported_formats": "PDF • DOCX • TXT",
        "ai_status": "Ready"
    }


@router.get("/documents")
def get_documents():

    documents = []

    if not os.path.exists(Config.UPLOAD_FOLDER):
        return []

    for filename in os.listdir(Config.UPLOAD_FOLDER):

        path = os.path.join(Config.UPLOAD_FOLDER, filename)

        if os.path.isfile(path):

            size = round(
                os.path.getsize(path) / (1024 * 1024),
                2
            )

            uploaded = datetime.fromtimestamp(
                os.path.getmtime(path)
            ).strftime("%d %b %Y")

            extension = filename.split(".")[-1].upper()

            documents.append(
                {
                    "name": filename,
                    "type": extension,
                    "size": f"{size} MB",
                    "uploaded": uploaded
                }
            )

    documents.sort(key=lambda x: x["name"])

    return documents


@router.delete("/documents/{filename}")
def delete_document(filename: str):

    file_path = os.path.join(
        Config.UPLOAD_FOLDER,
        filename
    )

    if not os.path.exists(file_path):

        raise HTTPException(
            status_code=404,
            detail="Document not found."
        )

    os.remove(file_path)

    pipeline = RAGPipeline()
    pipeline.index_documents()

    return {
        "message": "Document deleted successfully."
    }