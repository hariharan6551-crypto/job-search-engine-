"""
Job AI Platform — AI Engine
FastAPI microservice for resume parsing and job matching
"""

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import os

from api.routes import router as api_router

# ===== APP INITIALIZATION =====
app = FastAPI(
    title="Job AI Engine",
    description="AI-powered resume parsing and job matching microservice",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_router)


# ===== HEALTH CHECK =====
@app.get("/health", tags=["system"])
async def health_check():
    return {
        "status": "healthy",
        "service": "ai-engine",
        "version": "1.0.0",
        "models_loaded": True,
    }


@app.get("/", tags=["system"])
async def root():
    return {
        "message": "Job AI Engine is running",
        "docs": "/docs",
        "endpoints": {
            "parse_resume": "POST /parse-resume",
            "match_jobs": "POST /match-jobs",
            "health": "GET /health",
        },
    }


if __name__ == "__main__":
    port = int(os.getenv("AI_ENGINE_PORT", 8000))
    host = os.getenv("AI_ENGINE_HOST", "0.0.0.0")
    uvicorn.run("main:app", host=host, port=port, reload=True, log_level="info")
