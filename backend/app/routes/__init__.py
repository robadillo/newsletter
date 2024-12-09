from .newsletter import router as newsletter_router
from .recipients import router as recipients_router

routers = [newsletter_router, recipients_router]