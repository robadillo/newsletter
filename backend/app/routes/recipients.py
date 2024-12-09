# TODO: Separar logica de negocio de las rutas

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Recipient

router = APIRouter(prefix="/recipients", tags=["Recipients"])

class RecipientCreate(BaseModel):
    email: EmailStr
    name: Optional[str] = None
    newsletter_key: Optional[str] = "default"  # TODO: Revisar si debe ir por id o por nombre para que sea más de entender

class RecipientBulkCreate(BaseModel):
    recipients: List[RecipientCreate]

@router.get("/", response_model=List[dict])
def list_recipients(db: Session = Depends(get_db)):
    recipients = db.query(Recipient).all()
    return [
        {
            "id": r.id,
            "email": r.email,
            "name": r.name,
            "newsletter_key": r.newsletter_key,
            "created_at": r.created_at,
            "is_subscribed": r.is_subscribed
        }
        for r in recipients
    ]

@router.post("/", response_model=dict)
def add_recipient(recipient: RecipientCreate, db: Session = Depends(get_db)):
    # TODO: Verificar si ya existe el destinatario con ese email y newsletter_id
    existing = db.query(Recipient).filter(
        Recipient.email == recipient.email,
        Recipient.newsletter_key == recipient.newsletter_key
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Recipient already exists for this newsletter.")
    
    new_recipient = Recipient(
        email=recipient.email,
        name=recipient.name,
        newsletter_key=recipient.newsletter_key
    )
    db.add(new_recipient)
    db.commit()
    db.refresh(new_recipient)
    return {"message": f"Recipient '{new_recipient.email}' added successfully"}

@router.post("/bulk", response_model=dict)
def add_recipients_bulk(data: RecipientBulkCreate, db: Session = Depends(get_db)):
    added_count = 0
    for r in data.recipients:
        recipient_exists = db.query(Recipient).filter(
            Recipient.email == r.email,
            Recipient.newsletter_key == r.newsletter_key
        ).first()
        if not recipient_exists:
            new_r = Recipient(
                email=r.email,
                name=r.name,
                newsletter_key=r.newsletter_key,
            )
            db.add(new_r)
            added_count += 1

    db.commit()
    return {"message": f"Added {added_count} recipients successfully"}

@router.put("/unsubscribe", response_model=dict)
def unsubscribe(email: EmailStr, newsletter_key: str, db: Session = Depends(get_db)):
    recipient = db.query(Recipient).filter(
        Recipient.email == email,
        Recipient.newsletter_key == newsletter_key
    ).first()

    if not recipient:
        raise HTTPException(status_code=404, detail="Recipient not found for this newsletter.")
    
    recipient.is_subscribed = False
    db.commit()
    db.refresh(recipient)

    return {"message": f"Recipient '{recipient.email}' unsubscribed from newsletter {newsletter_key}."}
