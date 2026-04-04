"""
Resume Parser Module
Extracts structured data from resume documents using NLP.
"""

import re
from typing import Dict, List, Any


class ResumeParser:
    """Parse resumes and extract skills, experience, education, projects, etc."""

    # Skill Normalization Map
    SKILL_NORMALIZATION = {
        "js": "javascript",
        "ts": "typescript",
        "ml": "machine learning",
        "dl": "deep learning",
        "aws": "amazon web services",
        "gcp": "google cloud platform",
        "k8s": "kubernetes",
        "reactjs": "react",
        "node": "node.js",
        "postgres": "postgresql",
    }

    # Common technical skills database
    SKILLS_DB = [
        # Programming Languages
        "python", "javascript", "typescript", "java", "c++", "c#", "go", "rust",
        "ruby", "php", "swift", "kotlin", "scala", "r", "matlab", "dart",
        # Frontend
        "react", "angular", "vue", "next.js", "svelte", "html", "css", "sass",
        "tailwind", "bootstrap", "jquery", "redux", "webpack", "vite",
        # Backend
        "node.js", "express", "nestjs", "django", "flask", "fastapi", "spring",
        "rails", "laravel", "asp.net", "graphql", "rest api",
        # Database
        "postgresql", "mysql", "mongodb", "redis", "elasticsearch", "sqlite",
        "dynamodb", "cassandra", "firebase", "supabase",
        # Cloud & DevOps
        "aws", "azure", "gcp", "docker", "kubernetes", "terraform", "ansible",
        "jenkins", "github actions", "gitlab ci", "nginx", "linux",
        # AI/ML
        "tensorflow", "pytorch", "scikit-learn", "keras", "opencv", "nlp",
        "machine learning", "deep learning", "computer vision", "pandas", "numpy",
        # Tools
        "git", "jira", "figma", "postman", "vs code", "intellij",
    ]

    EDUCATION_KEYWORDS = [
        "b.tech", "m.tech", "b.e", "m.e", "bsc", "msc", "bca", "mca",
        "mba", "phd", "bachelor", "master", "diploma", "degree",
        "computer science", "information technology", "engineering",
        "university", "college", "institute",
    ]

    CERT_KEYWORDS = [
        "certified", "certification", "certificate", "aws certified",
        "google certified", "microsoft certified", "scrum master",
        "pmp", "cissp", "comptia",
    ]

    def parse(self, file_path: str) -> Dict[str, Any]:
        """Parse a resume file and extract structured data."""
        text = self._extract_text(file_path)
        
        skills = self._extract_skills(text)
        experience = self._extract_experience(text)
        education = self._extract_education(text)
        certifications = self._extract_certifications(text)
        projects = self._extract_projects(text)
        summary = self._generate_summary(text, skills, experience)
        score = self._calculate_score(skills, experience, education, certifications, projects)

        return {
            "skills": skills,
            "experience": experience,
            "education": education,
            "certifications": certifications,
            "projects": projects,
            "summary": summary,
            "score": score,
        }

    def _extract_text(self, file_path: str) -> str:
        """Extract text from PDF or DOCX files."""
        text = ""
        
        if file_path.endswith(".pdf"):
            try:
                import pdfplumber
                with pdfplumber.open(file_path) as pdf:
                    for page in pdf.pages:
                        page_text = page.extract_text()
                        if page_text:
                            text += page_text + "\n"
            except ImportError:
                try:
                    from PyPDF2 import PdfReader
                    reader = PdfReader(file_path)
                    for page in reader.pages:
                        page_text = page.extract_text()
                        if page_text:
                            text += page_text + "\n"
                except Exception:
                    text = "Unable to parse PDF"
                    
        elif file_path.endswith((".docx", ".doc")):
            try:
                from docx import Document
                doc = Document(file_path)
                text = "\n".join([para.text for para in doc.paragraphs])
            except Exception:
                text = "Unable to parse document"

        return text

    def _extract_skills(self, text: str) -> List[str]:
        """Extract technical skills from resume text."""
        text_lower = text.lower()
        found_skills = []

        for skill in self.SKILLS_DB:
            # Use word boundary matching
            pattern = r'\b' + re.escape(skill) + r'\b'
            if re.search(pattern, text_lower):
                # Normalize skill
                normalized = self.SKILL_NORMALIZATION.get(skill, skill)
                # Capitalize properly
                found_skills.append(normalized.title() if len(normalized) > 3 else normalized.upper())

        return list(set(found_skills))

    def _extract_experience(self, text: str) -> str:
        """Extract years of experience."""
        patterns = [
            r'(\d+)\+?\s*(?:years?|yrs?)[\s\w]*(?:experience|exp)',
            r'experience[\s\w]*(\d+)\+?\s*(?:years?|yrs?)',
            r'(\d+)\+?\s*(?:years?|yrs?)\s+(?:of\s+)?(?:professional|work|industry)',
        ]

        for pattern in patterns:
            match = re.search(pattern, text.lower())
            if match:
                years = match.group(1)
                return f"{years} years of professional experience"

        return "Experience details not found"

    def _extract_education(self, text: str) -> str:
        """Extract education information."""
        text_lower = text.lower()
        for keyword in self.EDUCATION_KEYWORDS:
            if keyword in text_lower:
                # Try to extract the full line containing the keyword
                for line in text.split("\n"):
                    if keyword in line.lower():
                        return line.strip()[:200]
        return "Education details not found"

    def _extract_projects(self, text: str) -> List[str]:
        """Extract project descriptions."""
        projects = []
        text_lower = text.lower()
        if "project" in text_lower:
            lines = text.split("\n")
            in_projects = False
            for line in lines:
                lower_line = line.lower().strip()
                if lower_line.startswith("project") or lower_line == "academic projects":
                    in_projects = True
                    continue
                if in_projects and len(line.strip()) > 0:
                    if len(line.strip()) > 10:
                        projects.append(line.strip()[:150])
                    if len(projects) >= 3:
                        break
                elif in_projects and len(line.strip()) == 0:
                    continue  # Ignore empty lines
        return projects

    def _extract_certifications(self, text: str) -> List[str]:
        """Extract certifications."""
        certs = []
        text_lower = text.lower()
        for keyword in self.CERT_KEYWORDS:
            if keyword in text_lower:
                for line in text.split("\n"):
                    if keyword in line.lower() and len(line.strip()) > 5:
                        certs.append(line.strip()[:100])
        return list(set(certs))[:5]

    def _generate_summary(self, text: str, skills: List[str], experience: str) -> str:
        """Generate a brief professional summary."""
        skill_count = len(skills)
        top_skills = ", ".join(skills[:5])
        return (
            f"Professional with {experience.lower()} and expertise in {skill_count} "
            f"technical skills including {top_skills}."
        )

    def _calculate_score(
        self,
        skills: List[str],
        experience: str,
        education: str,
        certifications: List[str],
        projects: List[str],
    ) -> int:
        """Calculate resume quality score (0-100)."""
        score = 0

        # Skills (max 40 points)
        score += min(len(skills) * 4, 40)

        # Experience (max 25 points)
        if "not found" not in experience.lower():
            score += 25
        else:
            score += 5

        # Education (max 20 points)
        if "not found" not in education.lower():
            score += 20
        else:
            score += 5

        # Projects (max 10 points)
        score += min(len(projects) * 5, 10)

        # Certifications (max 5 points)
        score += min(len(certifications) * 5, 5)

        return min(score, 100)
