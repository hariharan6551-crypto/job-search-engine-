"""
Utility functions for the AI engine.
"""

import re
from typing import List


def clean_text(text: str) -> str:
    """Clean and normalize text."""
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[^\w\s.,;:!?@#$%&*()+-]', '', text)
    return text.strip()


def extract_emails(text: str) -> List[str]:
    """Extract email addresses from text."""
    pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    return re.findall(pattern, text)


def extract_phone_numbers(text: str) -> List[str]:
    """Extract phone numbers from text."""
    pattern = r'(?:\+91[-\s]?)?(?:\d{5}[-\s]?\d{5}|\d{10})'
    return re.findall(pattern, text)


def normalize_skill(skill: str) -> str:
    """Normalize skill names."""
    skill_map = {
        "js": "JavaScript",
        "ts": "TypeScript",
        "py": "Python",
        "react.js": "React",
        "reactjs": "React",
        "node": "Node.js",
        "nodejs": "Node.js",
        "postgres": "PostgreSQL",
        "mongo": "MongoDB",
        "k8s": "Kubernetes",
        "tf": "TensorFlow",
    }
    return skill_map.get(skill.lower(), skill)


def calculate_experience_weight(years: int) -> float:
    """Calculate experience weight for scoring."""
    if years <= 1:
        return 0.5
    elif years <= 3:
        return 0.7
    elif years <= 5:
        return 0.85
    elif years <= 8:
        return 0.95
    return 1.0
