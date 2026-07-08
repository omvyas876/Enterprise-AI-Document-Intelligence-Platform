import os

from groq import Groq
from dotenv import load_dotenv

load_dotenv()


class LLMService:

    def __init__(self):

        self.client = Groq(
            api_key=os.getenv("GROQ_API_KEY")
        )

        self.model = os.getenv(
            "MODEL_NAME",
            "llama-3.3-70b-versatile"
        )

    # ==========================================
    # Answer using uploaded documents (RAG)
    # ==========================================

    def generate_answer(self, question, context):

        prompt = f"""
You are an Enterprise AI Document Intelligence Assistant.

Answer ONLY using the uploaded DOCUMENT CONTEXT.

Rules:

1. Never use outside knowledge.
2. Never invent information.
3. Never hallucinate.
4. If the answer is not found in the document, reply ONLY:

DOCUMENT_NOT_FOUND

5. Use simple plain text.
6. Do NOT use Markdown.
7. Write answers in a clean structured format.

Response Format

Title:
<Title>

Introduction:
<2-3 lines>

Main Points:

1. First Point
   - Explanation

2. Second Point
   - Explanation

3. Third Point
   - Explanation

Example:
<Example if available>

Summary:
<Short summary>

====================================

DOCUMENT CONTEXT

{context}

====================================

QUESTION

{question}

====================================

ANSWER
"""

        response = self.client.chat.completions.create(

            model=self.model,

            messages=[
                {
                    "role": "system",
                    "content": "Answer ONLY using uploaded documents."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            temperature=0.1,

            max_tokens=1000

        )

        return response.choices[0].message.content.strip()

    # ==========================================
    # General AI Knowledge
    # ==========================================

    def generate_general_answer(self, question):

        prompt = f"""
You are a professional AI assistant.

The uploaded documents do not contain the requested information.

Answer using your own knowledge.

Rules:

1. Use simple English.
2. Do NOT use Markdown.
3. Write in a structured format.

Response Format

Title:
<Title>

Introduction:
<2-3 lines>

Main Points:

1. First Point
   - Explanation

2. Second Point
   - Explanation

3. Third Point
   - Explanation

Example:
<Example if applicable>

Summary:
<Short summary>

QUESTION

{question}

ANSWER
"""

        response = self.client.chat.completions.create(

            model=self.model,

            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful AI assistant."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            temperature=0.3,

            max_tokens=1000

        )

        return response.choices[0].message.content.strip()