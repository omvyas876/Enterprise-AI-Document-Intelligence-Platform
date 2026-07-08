import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    APP_NAME = "Enterprise AI Document Intelligence Platform"
    VERSION = "1.0.0"

    GROQ_API_KEY = os.getenv("GROQ_API_KEY")

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    DATA_DIR = os.path.join(BASE_DIR, "data")

    UPLOAD_FOLDER = os.path.join(DATA_DIR, "uploads")

    VECTOR_DB = os.path.join(DATA_DIR, "vector_db")

    PROCESSED_FOLDER = os.path.join(DATA_DIR, "processed")