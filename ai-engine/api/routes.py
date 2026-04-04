"""AI Engine API Routes — Extended with all AI endpoints"""

from fastapi import APIRouter, File, UploadFile, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict
import tempfile
import os
import time

from resume_parser.parser import ResumeParser
from job_matcher.matcher import JobMatcher
from models.salary_predictor import SalaryPredictor
from models.career_path import CareerPathEngine
from models.skill_gap import SkillGapAnalyzer
from embeddings.encoder import TextEncoder

router = APIRouter()

resume_parser = ResumeParser()
job_matcher = JobMatcher()
salary_predictor = SalaryPredictor()
career_engine = CareerPathEngine()
skill_gap_analyzer = SkillGapAnalyzer()
text_encoder = TextEncoder()


# ===== REQUEST/RESPONSE MODELS =====

class ResumeParseResponse(BaseModel):
    skills: List[str]
    experience: str
    education: str
    certifications: List[str]
    summary: str
    score: int


class JobMatchRequest(BaseModel):
    user_id: Optional[str] = None
    skills: List[str]
    experience_years: int = 0
    preferred_locations: List[str] = []
    salary_min: Optional[float] = None
    salary_max: Optional[float] = None
    limit: int = 10


class MatchedJob(BaseModel):
    job_id: str
    title: str
    company: str
    location: str
    match_score: float
    skill_match: float
    location_match: float
    salary_match: float
    match_reasons: List[str]


class JobMatchResponse(BaseModel):
    matches: List[MatchedJob]
    total_analyzed: int
    processing_time_ms: float


class SalaryPredictRequest(BaseModel):
    skills: List[str]
    experience_years: int
    location: str = "bangalore"
    current_role: str = "software_engineer"
    education: str = "bachelors"


class CareerPathRequest(BaseModel):
    current_role: str
    skills: List[str]
    experience_years: int


class SkillGapRequest(BaseModel):
    user_skills: List[str]
    target_role: str = "full_stack_developer"
    user_skill_levels: Optional[Dict[str, int]] = None


class EmbeddingRequest(BaseModel):
    texts: List[str]


class EmbeddingResponse(BaseModel):
    embeddings: List[List[float]]
    dimension: int
    model: str


# ===== RESUME PARSING =====

@router.post("/parse-resume", response_model=ResumeParseResponse, tags=["resume"])
async def parse_resume(file: UploadFile = File(...)):
    """Parse a resume file and extract structured data using NLP."""
    allowed_types = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail=f"Unsupported file type: {file.content_type}")

    try:
        suffix = os.path.splitext(file.filename)[1] if file.filename else ".pdf"
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            content = await file.read()
            tmp.write(content)
            tmp_path = tmp.name

        result = resume_parser.parse(tmp_path)
        os.unlink(tmp_path)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse resume: {str(e)}")


# ===== JOB MATCHING =====

@router.post("/match-jobs", response_model=JobMatchResponse, tags=["matching"])
async def match_jobs(request: JobMatchRequest):
    """Match user profile to available jobs using embedding similarity."""
    try:
        return job_matcher.match(
            skills=request.skills,
            experience_years=request.experience_years,
            preferred_locations=request.preferred_locations,
            salary_min=request.salary_min,
            salary_max=request.salary_max,
            limit=request.limit,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Matching failed: {str(e)}")


@router.post("/match-score", tags=["matching"])
async def get_match_score(
    resume_text: str = "",
    job_description: str = "",
):
    """Calculate similarity score between a resume and job description."""
    if not resume_text or not job_description:
        raise HTTPException(status_code=400, detail="Both resume_text and job_description required")

    try:
        score = text_encoder.similarity(resume_text, job_description)
        return {
            "match_score": round(score * 100, 1),
            "confidence": "high" if score > 0.7 else "medium" if score > 0.4 else "low",
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ===== SALARY PREDICTION =====

@router.post("/salary-predict", tags=["prediction"])
async def predict_salary(request: SalaryPredictRequest):
    """Predict expected salary based on user profile."""
    try:
        return salary_predictor.predict(
            skills=request.skills,
            experience_years=request.experience_years,
            location=request.location,
            current_role=request.current_role,
            education=request.education,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


# ===== CAREER PATH =====

@router.post("/career-path", tags=["career"])
async def get_career_path(request: CareerPathRequest):
    """Generate personalized career progression path."""
    try:
        return career_engine.get_career_path(
            current_role=request.current_role,
            skills=request.skills,
            experience_years=request.experience_years,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Career path generation failed: {str(e)}")


# ===== SKILL GAP ANALYSIS =====

@router.post("/skill-gap", tags=["analysis"])
async def analyze_skill_gap(request: SkillGapRequest):
    """Analyze skill gaps between user profile and target role."""
    try:
        return skill_gap_analyzer.analyze(
            user_skills=request.user_skills,
            target_role=request.target_role,
            user_skill_levels=request.user_skill_levels,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


# ===== EMBEDDINGS =====

@router.post("/generate-embeddings", response_model=EmbeddingResponse, tags=["embeddings"])
async def generate_embeddings(request: EmbeddingRequest):
    """Generate text embeddings for semantic similarity."""
    try:
        embeddings = text_encoder.encode(request.texts)
        return {
            "embeddings": embeddings.tolist(),
            "dimension": embeddings.shape[1] if len(embeddings.shape) > 1 else len(embeddings[0]),
            "model": "all-MiniLM-L6-v2",
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
