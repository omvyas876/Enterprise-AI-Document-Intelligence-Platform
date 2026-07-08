from langchain_text_splitters import RecursiveCharacterTextSplitter

from utils.constants import (
    CHUNK_SIZE,
    CHUNK_OVERLAP
)


class TextChunker:

    @staticmethod
    def split(document_pages):

        splitter = RecursiveCharacterTextSplitter(
            chunk_size=CHUNK_SIZE,
            chunk_overlap=CHUNK_OVERLAP,
            length_function=len
        )

        all_chunks = []

        for page in document_pages:

            page_number = page["page"]

            page_text = page["text"]

            chunks = splitter.split_text(page_text)

            for chunk in chunks:

                all_chunks.append(
                    {
                        "page": page_number,
                        "text": chunk
                    }
                )

        return all_chunks