"""
Career Path AI Module
Suggests career progression, next roles, and skills to learn.
"""

from typing import List, Dict, Any


class CareerPathEngine:
    """Generate personalized career path recommendations."""

    # Career progression graphs
    CAREER_PATHS = {
        "frontend_developer": [
            {
                "role": "Frontend Developer",
                "level": "Junior",
                "salary_range": "₹5L-₹10L",
                "years": "0-2",
                "skills": ["HTML", "CSS", "JavaScript", "React"],
            },
            {
                "role": "Senior Frontend Engineer",
                "level": "Senior",
                "salary_range": "₹12L-₹22L",
                "years": "2-5",
                "skills": ["TypeScript", "Next.js", "Performance", "Testing"],
            },
            {
                "role": "Frontend Architect",
                "level": "Staff",
                "salary_range": "₹22L-₹40L",
                "years": "5-8",
                "skills": ["System Design", "Micro-frontends", "Leadership"],
            },
            {
                "role": "Engineering Manager",
                "level": "Manager",
                "salary_range": "₹35L-₹60L",
                "years": "8-12",
                "skills": ["People Management", "Strategy", "Budgeting"],
            },
        ],
        "backend_developer": [
            {
                "role": "Backend Developer",
                "level": "Junior",
                "salary_range": "₹5L-₹12L",
                "years": "0-2",
                "skills": ["Python/Node.js", "SQL", "REST APIs"],
            },
            {
                "role": "Senior Backend Engineer",
                "level": "Senior",
                "salary_range": "₹14L-₹25L",
                "years": "2-5",
                "skills": ["Microservices", "Docker", "Redis", "System Design"],
            },
            {
                "role": "Platform Engineer",
                "level": "Staff",
                "salary_range": "₹25L-₹45L",
                "years": "5-8",
                "skills": ["Kubernetes", "AWS", "Architecture", "Scaling"],
            },
            {
                "role": "VP of Engineering",
                "level": "VP",
                "salary_range": "₹50L-₹90L",
                "years": "10-15",
                "skills": ["Strategy", "Org Design", "Business Acumen"],
            },
        ],
        "full_stack_developer": [
            {
                "role": "Full-Stack Developer",
                "level": "Junior",
                "salary_range": "₹6L-₹12L",
                "years": "0-2",
                "skills": ["React", "Node.js", "PostgreSQL", "Git"],
            },
            {
                "role": "Senior Full-Stack Engineer",
                "level": "Senior",
                "salary_range": "₹15L-₹28L",
                "years": "2-5",
                "skills": ["TypeScript", "Docker", "CI/CD", "Testing"],
            },
            {
                "role": "Tech Lead",
                "level": "Lead",
                "salary_range": "₹28L-₹45L",
                "years": "5-8",
                "skills": ["Architecture", "Team Leadership", "AWS", "System Design"],
            },
            {
                "role": "CTO / Engineering Director",
                "level": "Executive",
                "salary_range": "₹55L-₹1Cr",
                "years": "10+",
                "skills": ["Business Strategy", "Product Vision", "Fundraising"],
            },
        ],
        "data_scientist": [
            {
                "role": "Data Analyst",
                "level": "Entry",
                "salary_range": "₹4L-₹8L",
                "years": "0-1",
                "skills": ["SQL", "Python", "Excel", "Statistics"],
            },
            {
                "role": "Data Scientist",
                "level": "Mid",
                "salary_range": "₹10L-₹20L",
                "years": "1-4",
                "skills": ["Machine Learning", "Pandas", "Scikit-learn", "Visualization"],
            },
            {
                "role": "Senior ML Engineer",
                "level": "Senior",
                "salary_range": "₹20L-₹40L",
                "years": "4-7",
                "skills": ["Deep Learning", "MLOps", "NLP", "TensorFlow"],
            },
            {
                "role": "Head of AI/ML",
                "level": "Director",
                "salary_range": "₹45L-₹80L",
                "years": "8+",
                "skills": ["Research", "Team Building", "AI Strategy"],
            },
        ],
    }

    COURSES = {
        "TypeScript": {"name": "Advanced TypeScript", "platform": "Frontend Masters", "hours": 12},
        "Docker": {"name": "Docker & Kubernetes Complete", "platform": "Udemy", "hours": 22},
        "AWS": {"name": "AWS Solutions Architect", "platform": "AWS Training", "hours": 40},
        "System Design": {"name": "System Design Interview", "platform": "Educative", "hours": 30},
        "Machine Learning": {"name": "ML Specialization", "platform": "Coursera", "hours": 60},
        "Leadership": {"name": "Engineering Leadership", "platform": "Coursera", "hours": 20},
        "Kubernetes": {"name": "CKA Certification Prep", "platform": "Linux Foundation", "hours": 35},
        "React": {"name": "Epic React", "platform": "Kent C. Dodds", "hours": 15},
        "Python": {"name": "Python for Data Science", "platform": "DataCamp", "hours": 25},
        "Next.js": {"name": "Next.js 14 Complete", "platform": "Vercel Docs", "hours": 10},
    }

    def get_career_path(
        self,
        current_role: str,
        skills: List[str],
        experience_years: int,
    ) -> Dict[str, Any]:
        """Generate personalized career path."""

        # Determine career track
        role_key = self._identify_track(current_role, skills)
        path = self.CAREER_PATHS.get(role_key, self.CAREER_PATHS["full_stack_developer"])

        # Determine current position in path
        current_idx = self._find_current_position(path, experience_years)

        # Annotate each step
        annotated_path = []
        for i, step in enumerate(path):
            status = "completed" if i < current_idx else "current" if i == current_idx else "upcoming"
            annotated_path.append({**step, "status": status})

        # Get skill recommendations for next step
        next_step = path[min(current_idx + 1, len(path) - 1)]
        user_skills_lower = {s.lower() for s in skills}
        skills_to_learn = [
            s for s in next_step["skills"]
            if s.lower() not in user_skills_lower
        ]

        # Get course recommendations
        courses = []
        for skill in skills_to_learn[:4]:
            if skill in self.COURSES:
                courses.append({**self.COURSES[skill], "skill": skill, "relevance": 90})
            else:
                courses.append({
                    "name": f"Learn {skill}",
                    "platform": "Various",
                    "hours": 20,
                    "skill": skill,
                    "relevance": 75,
                })

        return {
            "current_position": {
                "role": path[current_idx]["role"],
                "level": path[current_idx]["level"],
                "experience_years": experience_years,
            },
            "career_path": annotated_path,
            "next_step": {
                "role": next_step["role"],
                "timeframe": next_step["years"],
                "salary_range": next_step["salary_range"],
                "skills_needed": next_step["skills"],
                "skills_to_learn": skills_to_learn,
            },
            "recommended_courses": courses,
            "alternative_paths": self._get_alternative_paths(role_key, skills),
        }

    def _identify_track(self, role: str, skills: List[str]) -> str:
        """Identify which career track best matches the user."""
        role_lower = role.lower()
        skills_lower = {s.lower() for s in skills}

        if "data" in role_lower or "ml" in role_lower or "machine learning" in skills_lower:
            return "data_scientist"
        if "frontend" in role_lower or "react" in role_lower:
            return "frontend_developer"
        if "backend" in role_lower or "api" in role_lower:
            return "backend_developer"
        return "full_stack_developer"

    def _find_current_position(self, path: list, experience: int) -> int:
        """Find where the user is in the career path based on experience."""
        if experience <= 2:
            return 0
        elif experience <= 5:
            return 1
        elif experience <= 8:
            return min(2, len(path) - 1)
        else:
            return min(3, len(path) - 1)

    def _get_alternative_paths(self, current_track: str, skills: List[str]) -> List[Dict]:
        """Suggest alternative career directions."""
        alternatives = []
        for track_key, track_path in self.CAREER_PATHS.items():
            if track_key != current_track:
                alternatives.append({
                    "track": track_key.replace("_", " ").title(),
                    "entry_role": track_path[0]["role"],
                    "top_role": track_path[-1]["role"],
                    "feasibility": "high" if any(
                        s.lower() in {sk.lower() for step in track_path for sk in step["skills"]}
                        for s in skills
                    ) else "medium",
                })
        return alternatives[:3]
