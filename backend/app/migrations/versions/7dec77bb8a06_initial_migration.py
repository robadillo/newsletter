"""Initial migration

Revision ID: 7dec77bb8a06
Revises: 
Create Date: 2024-12-08 19:51:30.874539

"""
from alembic import op
import sqlalchemy as sa
from datetime import datetime
import uuid

# Revisión ID y downgrader/upgrade
revision = 'XXXXXXXXXXXX'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    # Crear tablas
    op.create_table(
        'recipients',
        sa.Column('id', sa.String(), primary_key=True, index=True),
        sa.Column('email', sa.String(), unique=True, nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('newsletter_key', sa.String(), nullable=False),
        sa.Column('is_subscribed', sa.Boolean(), nullable=False, server_default=sa.text('1')),
        sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.text("CURRENT_TIMESTAMP"))
    )

    op.create_table(
        'newsletter',
        sa.Column('id', sa.String(), primary_key=True, index=True),
        sa.Column('key', sa.String(), nullable=False),
        sa.Column('content', sa.String(), nullable=False),
        sa.Column('file', sa.LargeBinary, nullable=False),
        sa.Column('file_extension', sa.String(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.text("CURRENT_TIMESTAMP"))
    )

    newsletter_id = uuid.uuid4()
    recipient_id = uuid.uuid4()

    # Insertar newsletter por defecto
    op.execute(
        f"INSERT INTO newsletter (id, key, content, file, file_extension) VALUES ('{newsletter_id}', 'default', 'Welcome to our service!', X'00', 'pdf')"
    )

    # Insertar usuario por defecto
    op.execute(
        f"INSERT INTO recipients (id, email, name, newsletter_key) VALUES ('{recipient_id}', 'onigirimex@gmail.com', 'Rodrigo Default', 'default')"
    )

def downgrade():
    op.drop_table('recipients')
    op.drop_table('newsletter')
