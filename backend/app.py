from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from utils.config import Config

from routes.upload import router as upload_router
from routes.documents import router as documents_router
from routes.chat import router as chat_router   # <-- Add this

app = FastAPI(
    title=Config.APP_NAME,
    version=Config.VERSION,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register all routers
app.include_router(upload_router)
app.include_router(documents_router)
app.include_router(chat_router)   # <-- Add this


@app.get("/")
def home():

    return {
        "application": Config.APP_NAME,
        "status": "Running",
        "developer": "Om Vyas",
    }


@app.get("/health")
def health():

    return {
        "status": "Healthy",
    }