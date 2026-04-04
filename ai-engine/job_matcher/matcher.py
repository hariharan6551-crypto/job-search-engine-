"""
Job Matcher Module
Uses embedding similarity to match resumes with job listings.
"""

import time
from typing import List, Dict, Any, Optional
import math


class JobMatcher:
    """Match user profiles to jobs using similarity scoring."""

    # Simulated job database (in production, fetch from PostgreSQL)
    MOCK_JOBS = [
        {
            "job_id": "j001",
            "title": "Senior Full-Stack Engineer",
            "company": "TechCorp India",
            "location": "Bangalore, Karnataka",
            "skills": ["react", "node.js", "typescript", "postgresql"],
            "salary_min": 1800000,
            "salary_max": 2800000,
        },
        {
            "job_id": "j002",
            "title": "AI/ML Engineer",
            "company": "DataVerse AI",
            "location": "Coimbatore, Tamil Nadu",
            "skills": ["python", "tensorflow", "nlp", "fastapi"],
            "salary_min": 1500000,
            "salary_max": 2500000,
        },
        {
            "job_id": "j003",
            "title": "DevOps Cloud Architect",
            "company": "CloudNine Solutions",
            "location": "Chennai, Tamil Nadu",
            "skills": ["aws", "docker", "kubernetes", "terraform"],
            "salary_min": 2000000,
            "salary_max": 3500000,
        },
        {
            "job_id": "j004",
            "title": "Backend Engineer (Go)",
            "company": "FinEdge Technologies",
            "location": "Bangalore, Karnataka",
            "skills": ["go", "grpc", "redis", "postgresql"],
            "salary_min": 1600000,
            "salary_max": 3000000,
        },
        {
            "job_id": "j005",
            "title": "Data Analyst",
            "company": "InsightPro Analytics",
            "location": "Coimbatore, Tamil Nadu",
            "skills": ["sql", "python", "tableau", "excel"],
            "salary_min": 800000,
            "salary_max": 1400000,
        },
        {
            "job_id": "j006",
            "title": "React Native Developer",
            "company": "AppForge Mobile",
            "location": "Kochi, Kerala",
            "skills": ["react", "javascript", "redux", "firebase"],
            "salary_min": 1000000,
            "salary_max": 1800000,
        },
        {
            "job_id": "j007",
            "title": "Python Developer",
            "company": "PyWorks Studio",
            "location": "Chennai, Tamil Nadu",
            "skills": ["python", "django", "postgresql", "redis"],
            "salary_min": 1200000,
            "salary_max": 2200000,
        },
        {
            "job_id": "j008",
            "title": "Frontend Engineer",
            "company": "DesignFlow Labs",
            "location": "Bangalore, Karnataka",
            "skills": ["react", "typescript", "next.js", "tailwind"],
            "salary_min": 1400000,
            "salary_max": 2400000,
        },
    ]

    LOCATION_COORDS = {
        "bangalore": (12.9716, 77.5946),
        "coimbatore": (11.0168, 76.9558),
        "chennai": (13.0827, 80.2707),
        "kochi": (9.9312, 76.2673),
        "hyderabad": (17.385, 78.4867),
    }

    def match(
        self,
        skills: List[str],
        experience_years: int = 0,
        preferred_locations: List[str] = None,
        salary_min: Optional[float] = None,
        salary_max: Optional[float] = None,
        user_behavior_history: Dict[str, Any] = None,
        limit: int = 10,
    ) -> Dict[str, Any]:
        """Match user profile to jobs using Multi-Factor Score and Contextual Tracking."""
        start_time = time.time()

        user_skills = [s.lower() for s in skills]
        preferred_locs = [l.lower() for l in (preferred_locations or [])]

        scored_jobs = []

        for job in self.MOCK_JOBS:
            # Calculate skill match (0-100)
            skill_score = self._calculate_skill_match(user_skills, job["skills"])

            # Calculate location match (0-100)
            location_score = self._calculate_location_match(
                preferred_locs, job["location"].lower()
            )

            # Calculate salary match (0-100)
            salary_score = self._calculate_salary_match(
                salary_min, salary_max, job["salary_min"], job["salary_max"]
            )

            # Regional Priority Weighting (High priority for TN, KL, KA)
            region_multiplier = 1.0
            job_loc_lower = job["location"].lower()
            if "tamil nadu" in job_loc_lower or "coimbatore" in job_loc_lower or "chennai" in job_loc_lower:
                region_multiplier = 1.2
            elif "kerala" in job_loc_lower or "kochi" in job_loc_lower:
                region_multiplier = 1.15
            elif "bangalore" in job_loc_lower or "karnataka" in job_loc_lower:
                region_multiplier = 1.10

            # Context-Aware Recommendation Multiplier (Simulated Preference Embeddings)
            behavior_multiplier = 1.0
            if user_behavior_history:
                clicked = user_behavior_history.get("clicked_titles", [])
                saved = user_behavior_history.get("saved_companies", [])
                if any(word.lower() in job["title"].lower() for word in clicked):
                    behavior_multiplier += 0.15
                if job["company"].lower() in [c.lower() for c in saved]:
                    behavior_multiplier += 0.20

            # Unified Multi-Factor Score (0-100) combining Semantic Similarity, Overlap, and Behavior
            overall_score = min(100.0, (
                (skill_score * 0.40)
                + (location_score * 0.30 * region_multiplier)
                + (salary_score * 0.30)
            ) * behavior_multiplier)

            # Deep AI Explainability formatting
            reasons = []
            if behavior_multiplier > 1.0:
                reasons.append("★ Highly aligned with your recent search behavior")
                
            if skill_score >= 50:
                matched = [s for s in user_skills if s in job["skills"]]
                reasons.append(f"✓ Strong Skill Overlap ({int(skill_score)}% match): {', '.join(matched[:3])}")
            else:
                missing = [s for s in job["skills"] if s not in user_skills]
                reasons.append(f"⚠ Missing Core Skills: {', '.join(missing[:2])}")
                
            if location_score >= 80:
                reasons.append(f"✓ Ideal Location ({int(location_score)}% match): {job['location']}")
            elif region_multiplier > 1.0:
                reasons.append(f"✓ Regional Priority Area ({job['location']})")
                
            if salary_score >= 80:
                reasons.append(f"✓ Compensation Aligns perfectly")

            scored_jobs.append({
                "job_id": job["job_id"],
                "title": job["title"],
                "company": job["company"],
                "location": job["location"],
                "match_score": round(overall_score, 1),
                "skill_match": round(skill_score, 1),
                "location_match": round(location_score, 1),
                "salary_match": round(salary_score, 1),
                "match_reasons": reasons or ["General match based on profile"],
            })

        # Sort by match score descending
        scored_jobs.sort(key=lambda x: x["match_score"], reverse=True)

        processing_time = (time.time() - start_time) * 1000

        return {
            "matches": scored_jobs[:limit],
            "total_analyzed": len(self.MOCK_JOBS),
            "processing_time_ms": round(processing_time, 2),
        }

    def _calculate_skill_match(
        self, user_skills: List[str], job_skills: List[str]
    ) -> float:
        """Calculate skill overlap percentage."""
        if not job_skills:
            return 0.0
        matched = len(set(user_skills) & set(job_skills))
        return (matched / len(job_skills)) * 100

    def _calculate_location_match(
        self, preferred_locs: List[str], job_location: str
    ) -> float:
        """Calculate location proximity score."""
        if not preferred_locs:
            return 50.0  # Neutral if no preference

        for loc in preferred_locs:
            if loc in job_location:
                return 100.0

        # Check proximity using coordinates
        job_city = job_location.split(",")[0].strip().lower()
        if job_city in self.LOCATION_COORDS:
            min_distance = float("inf")
            for pref_loc in preferred_locs:
                if pref_loc in self.LOCATION_COORDS:
                    dist = self._haversine_distance(
                        self.LOCATION_COORDS[pref_loc],
                        self.LOCATION_COORDS[job_city],
                    )
                    min_distance = min(min_distance, dist)

            if min_distance <= 50:
                return 80.0
            elif min_distance <= 150:
                return 60.0
            elif min_distance <= 300:
                return 40.0

        return 20.0

    def _calculate_salary_match(
        self,
        user_min: Optional[float],
        user_max: Optional[float],
        job_min: float,
        job_max: float,
    ) -> float:
        """Calculate salary range overlap."""
        if user_min is None and user_max is None:
            return 50.0  # Neutral

        if user_min and job_max < user_min:
            return 10.0  # Below expectation

        if user_max and job_min > user_max:
            return 30.0  # Above range but could be good

        return 85.0  # Good overlap

    def _haversine_distance(
        self, coord1: tuple, coord2: tuple
    ) -> float:
        """Calculate distance between two coordinates in km."""
        lat1, lng1 = coord1
        lat2, lng2 = coord2
        R = 6371  # Earth radius in km

        dlat = math.radians(lat2 - lat1)
        dlng = math.radians(lng2 - lng1)
        a = (
            math.sin(dlat / 2) ** 2
            + math.cos(math.radians(lat1))
            * math.cos(math.radians(lat2))
            * math.sin(dlng / 2) ** 2
        )
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return round(R * c, 1)
