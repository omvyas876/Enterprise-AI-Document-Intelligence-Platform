# Enterprise AI Document Intelligence Platform

An AI-powered document intelligence platform that enables users to upload documents, search their content using Retrieval-Augmented Generation (RAG), and receive accurate AI-generated answers through a conversational interface.

The platform combines semantic search, vector databases, and Large Language Models (LLMs) to provide intelligent document question answering. When information is unavailable in the uploaded documents, the system automatically generates a response using general AI knowledge.

---

## Overview

Enterprise AI Document Intelligence Platform is designed to simplify document understanding by allowing users to interact with their files through natural language.

Instead of manually searching large documents, users can ask questions, and the system retrieves the most relevant information using semantic search before generating a context-aware response.

---

## Key Features

### Document Management

- Upload PDF, DOCX, and TXT documents
- Automatic document indexing
- Delete uploaded documents
- Automatic vector database refresh
- Document metadata management

### AI Assistant

- Intelligent question answering
- Context-aware responses
- Automatic document search
- Source document identification
- Page number reference
- General AI fallback when no relevant document content is found

### Retrieval-Augmented Generation (RAG)

- Document chunking
- Sentence embedding generation
- Semantic similarity search
- FAISS vector database
- Context retrieval
- LLM-powered response generation

### Dashboard

- Total uploaded documents
- Latest uploaded document
- Supported document formats
- AI system status

---

# System Architecture

```
User
   │
   ▼
React Frontend
   │
REST API
   │
FastAPI Backend
   │
Document Processing
   │
Text Chunking
   │
Sentence Embeddings
   │
FAISS Vector Database
   │
Semantic Search
   │
Groq LLM
   │
AI Response
```

---

# Technology Stack

## Frontend

- React.js
- Vite
- Axios
- React Router
- React Icons
- React Toastify
- CSS3

## Backend

- FastAPI
- Python
- Uvicorn
- Pydantic

## Artificial Intelligence

- Retrieval-Augmented Generation (RAG)
- Sentence Transformers
- FAISS
- Groq API
- Llama 3.3 70B Versatile

## Document Processing

- PyMuPDF
- python-docx
- Text Chunking

---

# Project Structure

```
Enterprise-AI-Document-Intelligence-Platform

│
├── backend
│   ├── routes
│   ├── services
│   ├── utils
│   ├── uploads
│   ├── vector_db
│   ├── app.py
│   └── requirements.txt
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   ├── services
│   ├── styles
│   ├── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

---

# Installation

## Clone the Repository

```bash
git clone https://github.com/omvyas876/Enterprise-AI-Document-Intelligence-Platform.git
```

```bash
cd Enterprise-AI-Document-Intelligence-Platform
```

---

## Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

Create a virtual environment.

```bash
python -m venv venv
```

Activate the virtual environment.

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install the required packages.

```bash
pip install -r requirements.txt
```

Create a `.env` file inside the backend directory.

```env
GROQ_API_KEY=YOUR_GROQ_API_KEY
MODEL_NAME=llama-3.3-70b-versatile
```

Run the FastAPI server.

```bash
uvicorn app:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

---

## Frontend Setup

Navigate to the frontend directory.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Run the development server.

```bash
npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# Workflow

1. User uploads one or more documents.
2. Documents are processed and text is extracted.
3. Text is divided into smaller chunks.
4. Sentence embeddings are generated.
5. Embeddings are stored in the FAISS vector database.
6. User submits a question.
7. The system performs semantic similarity search.
8. Relevant document chunks are retrieved.
9. Context is sent to the Large Language Model.
10. AI generates a structured response.
11. Source document and page number are displayed.
12. If no relevant content is found, the system automatically generates a general AI response.

---

# Future Enhancements

- User Authentication
- Chat History
- Multi-user Support
- OCR Support for Scanned Documents
- Cloud Storage Integration
- Voice-based Queries
- Multi-language Support
- Role-Based Access Control
- Dark Mode
- Document Summarization
- AI-generated Document Insights

---

# Learning Outcomes

This project demonstrates practical implementation of:

- Retrieval-Augmented Generation (RAG)
- Large Language Models (LLMs)
- Semantic Search
- Vector Databases
- FastAPI Development
- React.js Development
- REST API Integration
- AI-powered Document Question Answering
- Full-Stack AI Application Development

---

# Author

**Om Vyas**

B.Tech Computer Science & Engineering

GitHub: https://github.com/omvyas876