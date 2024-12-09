from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, LargeBinary, DateTime
from app.database import Base # TODO: ESTO CAUSA ERROR AL CORRER LA MIGRACION
import uuid

class Recipient(Base):
    __tablename__ = "recipients"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    newsletter_key = Column(String, nullable=False, default="default")
    is_subscribed = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.now)

class Newsletter(Base):
    __tablename__ = "newsletter"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4())) 
    key = Column(String, index=True, nullable=False, unique=True)
    content = Column(String, nullable=False)
    file = Column(LargeBinary, nullable=False)
    file_extension = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.now)
