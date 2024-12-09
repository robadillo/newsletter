from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models import Recipient

router = APIRouter(prefix="/recipients", tags=["Recipients"])

@router.post("/add")
async def add_recipient(email: str, newsletter_type: str = "general", db: AsyncSession = Depends(get_db)):
    recipient = Recipient(email=email, newsletter_type=newsletter_type)
    db.add(recipient)
    await db.commit()
    return {"message": f"Recipient '{email}' added successfully"}

@router.get("/")
async def list_recipients(db: AsyncSession = Depends(get_db)):
    recipients = await db.execute(text("SELECT * FROM recipients"))
    return recipients.fetchall()
