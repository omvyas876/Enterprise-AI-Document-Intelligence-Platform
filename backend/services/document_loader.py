from pathlib import Path

from pypdf import PdfReader
from docx import Document


class DocumentLoader:

    @staticmethod
    def load(file_path: str):

        extension = Path(file_path).suffix.lower()

        if extension == ".pdf":
            return DocumentLoader.read_pdf(file_path)

        elif extension == ".docx":
            return DocumentLoader.read_docx(file_path)

        elif extension == ".txt":
            return DocumentLoader.read_txt(file_path)

        else:
            raise ValueError("Unsupported document type.")

    @staticmethod
    def read_pdf(file_path):

        reader = PdfReader(file_path)

        pages = []

        for page_number, page in enumerate(reader.pages, start=1):

            text = page.extract_text()

            if text and text.strip():

                pages.append(
                    {
                        "page": page_number,
                        "text": text.strip()
                    }
                )

        return pages

    @staticmethod
    def read_docx(file_path):

        document = Document(file_path)

        text = "\n".join(
            paragraph.text
            for paragraph in document.paragraphs
            if paragraph.text.strip()
        )

        return [
            {
                "page": 1,
                "text": text
            }
        ]

    @staticmethod
    def read_txt(file_path):

        with open(
            file_path,
            "r",
            encoding="utf-8"
        ) as file:

            text = file.read()

        return [
            {
                "page": 1,
                "text": text
            }
        ]