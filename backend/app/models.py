from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, LargeBinary, DateTime
from app.database import Base

class Recipient(Base):
    __tablename__ = "recipients"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    newsletter_id = Column(Integer, nullable=False, default=1)
    is_subscribed = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.now)

class Newsletter(Base):  # Debe heredar de Base, no de BaseModel
    __tablename__ = "newsletter"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    file_type = Column(LargeBinary, nullable=False)
    created_at = Column(DateTime, default=datetime.now)
