import uuid

def generate_unique_filename(filename: str) -> str:
    extension = filename.split(".")[-1]
    return f"{uuid.uuid4()}.{extension}"