import os

from services.document_loader import DocumentLoader
from services.chunking import TextChunker
from services.embeddings import EmbeddingService
from services.vector_store import VectorStore

from utils.config import Config


class RAGPipeline:

    def __init__(self):

        self.embedding_service = EmbeddingService()

        self.vector_store = VectorStore()

    # ==========================================
    # Create / Rebuild Vector Database
    # ==========================================

    def index_documents(self):

        upload_folder = Config.UPLOAD_FOLDER

        # Upload folder doesn't exist
        if not os.path.exists(upload_folder):

            self.vector_store.clear()

            print("Upload folder not found.")

            return False

        files = [

            file

            for file in os.listdir(upload_folder)

            if os.path.isfile(
                os.path.join(upload_folder, file)
            )

        ]

        # No documents available
        if len(files) == 0:

            self.vector_store.clear()

            print("No documents found. Vector database cleared.")

            return False

        metadata = []

        print("\n========== DOCUMENT INDEXING ==========\n")

        for filename in files:

            file_path = os.path.join(
                upload_folder,
                filename
            )

            try:

                print(f"Reading : {filename}")

                pages = DocumentLoader.load(file_path)

                chunks = TextChunker.split(pages)

                print(f"Chunks : {len(chunks)}")

                for chunk in chunks:

                    metadata.append(

                        {
                            "document": filename,
                            "page": chunk["page"],
                            "text": chunk["text"]
                        }

                    )

            except Exception as error:

                print(f"Error indexing : {filename}")

                print(error)

        # No text extracted
        if len(metadata) == 0:

            self.vector_store.clear()

            print("No text extracted. Vector database cleared.")

            return False

        print("\nGenerating Embeddings...\n")

        embeddings = self.embedding_service.embed_documents(

            [

                item["text"]

                for item in metadata

            ]

        )

        print("Creating Vector Database...\n")

        self.vector_store.create(

            embeddings,

            metadata

        )

        print("Index Created Successfully")

        print(f"Total Chunks : {len(metadata)}")

        return True

    # ==========================================
    # Search
    # ==========================================

    def search(

        self,

        question,

        top_k=5

    ):

        try:

            self.vector_store.load()

        except FileNotFoundError:

            return []

        query_embedding = self.embedding_service.embed_query(

            question

        )

        results = self.vector_store.search(

            query_embedding,

            top_k

        )

        return results