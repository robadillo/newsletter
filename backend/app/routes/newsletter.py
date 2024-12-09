from fastapi import APIRouter, UploadFile, File
from app.services import send_email_with_attachment

router = APIRouter(prefix="/newsletter", tags=["Newsletter"])

@router.post("/upload")
async def upload_newsletter(file: UploadFile = File(...)):
    # vamos a guardar el archivo temporalmente
    with open(f"uploads/{file.filename}", "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    return {"message": f"Archivo {file.filename} uploaded successfully"}

@router.post("/send")
async def send_newsletter(recipients: list[str], file_path: str):
    # send email
    for email in recipients:
        send_email_with_attachment(email, file_path)
    return {"message": f"Newsletter sent to {len(recipients)} recipients"}