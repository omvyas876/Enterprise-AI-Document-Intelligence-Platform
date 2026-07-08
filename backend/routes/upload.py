import os
import shutil

from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import HTTPException

from utils.helpers import is_supported
from utils.config import Config

from services.rag_pipeline import RAGPipeline

router = APIRouter(
    prefix="/api",
    tags=["Upload"],
)

os.makedirs(
    Config.UPLOAD_FOLDER,
    exist_ok=True,
)


@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...)
):

    if not is_supported(file.filename):

        raise HTTPException(
            status_code=400,
            detail="Unsupported file type.",
        )

    destination = os.path.join(
        Config.UPLOAD_FOLDER,
        file.filename,
    )

    with open(destination, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer,
        )

    pipeline = RAGPipeline()

    pipeline.index_documents()

    return {

        "message": "Document uploaded successfully.",

        "filename": file.filename,

        "status": "Indexed"

    }