import os


def get_extension(filename: str):
    return os.path.splitext(filename)[1].lower()


def is_supported(filename: str):

    extension = get_extension(filename)

    return extension in [
        ".pdf",
        ".docx",
        ".txt"
    ]