import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders

def send_email_with_attachment(recipient_email: str, file_bytes: bytes, file_name: str):
    # setup
    sender_email = "robadillo.test@gmail.com" # TODO: Meter en VAULT
    password = "fnytozzfcqhxobtr"
    smtp_server = "smtp.gmail.com"
    smtp_port = 587

    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = recipient_email
    msg["Subject"] = "Newsletter" # TODO: Poner el nombre del newsletter correcto

    body = "This is a test email with an attachment." # TODO: Poner el cuerpo del email correcto
    msg.attach(MIMEText(body, "html"))

    # attach the file
    part = MIMEBase("application", "octet-stream")
    part.set_payload(file_bytes)
    encoders.encode_base64(part)
    part.add_header("Content-Disposition", f"attachment; filename= {file_name}")
    msg.attach(part)

    # send email
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(sender_email, password)
        server.sendmail(sender_email, recipient_email, msg.as_string())