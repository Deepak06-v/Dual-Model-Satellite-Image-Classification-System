from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
from app.routes import Classification

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app=FastAPI(
    title="CNN Classification model",
    description="Transfer learning vs scratch model comparison",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["Health"])
@app.get("/health", tags=["Health"])
def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "message": "CNN classification backend is running",
        "version": "1.0.0"
    }

app.include_router(Classification.router,prefix="/cnn",tags=["Cnn classification"])