from fastapi import FastAPI
from app.routes import newsletter, recipients

app = FastAPI()

app.include_router(newsletter.router)
app.include_router(recipients.router)

@app.get("/")
def root():
    return {"message": "Newsletter API is running"}