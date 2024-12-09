from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional, List
from app.database import get_db
from app.models import Newsletter, Recipient
from datetime import datetime
import base64

from app.services import send_email_with_attachment as send_email

router = APIRouter(prefix="/newsletter", tags=["Newsletter"])

# TODO: agregar documentación de cada endpoint

@router.get("/", response_model=List[dict])
def list_newsletters(db: Session = Depends(get_db)):
    newsletters = db.query(Newsletter).all()
    return [
        {
            "id": n.id,
            "key": n.key,
            "content": n.content,
            #"file": base64.b64encode(n.file).decode('utf-8'), TODO: REVISAR SI NECESITAMOS REGRESAR EL FILE
            "file_extension": n.file_extension,
            "created_at": n.created_at
        }
        for n in newsletters
    ]

@router.get("/{key}", response_model=dict)
def get_newsletter(key: str, db: Session = Depends(get_db)):
    newsletter = db.query(Newsletter).filter(Newsletter.key == key).first()
    if not newsletter:
        raise HTTPException(status_code=404, detail="Newsletter not found")
    return {
        "id": newsletter.id,
        "key": newsletter.key,
        "content": newsletter.content,
        #"file": base64.b64encode(newsletter.file).decode('utf-8'), TODO: REVISAR SI NECESITAMOS REGRESAR EL FILE
        "file_extension": newsletter.file_extension,
        "created_at": newsletter.created_at
    }

@router.post("/upload", response_model=dict)
async def upload_newsletter(
    key: str = Form(...),
    content: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    newsletter_exists = db.query(Newsletter).filter(Newsletter.key == key).first()
    if newsletter_exists:
        raise HTTPException(status_code=400, detail="Newsletter with this key already exists.")

    file_bytes = await file.read()

    new_newsletter = Newsletter(
        key=key,
        content=content,
        file=file_bytes,  # Contenido binario (PDF/PNG)
        file_extension= file.filename.split(".")[-1],
        created_at=datetime.now()
    )
    db.add(new_newsletter)
    db.commit()
    db.refresh(new_newsletter)
    return {"message": f"Newsletter '{new_newsletter.key}' uploaded successfully"}

@router.post("/send", response_model=dict)
def send_newsletter(key: str, db: Session = Depends(get_db)):
    newsletter = db.query(Newsletter).filter(Newsletter.key == key).first()
    if not newsletter:
        raise HTTPException(status_code=404, detail="Newsletter not found")

    recipients = db.query(Recipient).filter(
        Recipient.newsletter_key == key,
        Recipient.is_subscribed == True
    ).all()

    if not recipients:
        return {"message": "No recipients subscribed to this newsletter."}

    newsletter_name = f"{newsletter.key}.{newsletter.file_extension}"
    # Enviar correos
    for r in recipients:
        # Usar send_email: Se asume que la función acepta un parámetro para adjunto binario
        send_email(
            r.email,
            newsletter.file,  # Archivo binario (PDF/PNG)
            newsletter_name
        )

    return {"message": f"Newsletter '{key}' sent to {len(recipients)} recipients."}