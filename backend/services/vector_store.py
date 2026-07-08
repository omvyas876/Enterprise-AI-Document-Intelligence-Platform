import os
import pickle
import faiss
import numpy as np

from utils.config import Config


class VectorStore:

    def __init__(self):

        os.makedirs(Config.VECTOR_DB, exist_ok=True)

        self.index = None
        self.metadata = []

        self.index_file = os.path.join(
            Config.VECTOR_DB,
            "faiss.index"
        )

        self.metadata_file = os.path.join(
            Config.VECTOR_DB,
            "metadata.pkl"
        )

    # ==========================
    # Create Vector DB
    # ==========================

    def create(self, embeddings, metadata):

        self.clear()

        dimension = embeddings.shape[1]

        self.index = faiss.IndexFlatL2(dimension)

        self.index.add(
            np.array(
                embeddings,
                dtype="float32"
            )
        )

        self.metadata = metadata

        faiss.write_index(
            self.index,
            self.index_file
        )

        with open(
            self.metadata_file,
            "wb"
        ) as file:

            pickle.dump(
                self.metadata,
                file
            )

    # ==========================
    # Load
    # ==========================

    def load(self):

        if not os.path.exists(self.index_file):

            raise FileNotFoundError(
                "Vector database not found."
            )

        self.index = faiss.read_index(
            self.index_file
        )

        with open(
            self.metadata_file,
            "rb"
        ) as file:

            self.metadata = pickle.load(file)

    # ==========================
    # Search
    # ==========================

    def search(
        self,
        query_embedding,
        top_k=5
    ):

        distances, indices = self.index.search(
            np.array(
                [query_embedding],
                dtype="float32"
            ),
            top_k
        )

        results = []

        for index in indices[0]:

            if 0 <= index < len(self.metadata):

                results.append(
                    {
                        "document": self.metadata[index]["document"],
                        "page": self.metadata[index]["page"],
                        "text": self.metadata[index]["text"]
                    }
                )

        return results

    # ==========================
    # Clear Vector Database
    # ==========================

    def clear(self):

        self.index = None
        self.metadata = []

        if os.path.exists(self.index_file):
            os.remove(self.index_file)

        if os.path.exists(self.metadata_file):
            os.remove(self.metadata_file)