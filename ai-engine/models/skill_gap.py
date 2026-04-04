"""
Skill Gap Analyzer Module
Compares user skills against top job requirements to find gaps.
"""

from typing import List, Dict, Any


class SkillGapAnalyzer:
    """Analyze skill gaps between user profile and target roles."""

    # Skill proficiency levels expected by role
    ROLE_REQUIREMENTS = {
        "full_stack_developer": {
            "React": 85, "Node.js": 80, "TypeScript": 90, "PostgreSQL": 70,
            "Docker": 75, "AWS": 70, "Git": 90, "CI/CD": 70,
            "System Design": 60, "Testing": 75,
        },
        "frontend_developer": {
            "React": 90, "TypeScript": 85, "CSS": 85, "Next.js": 80,
            "Testing": 80, "Performance": 75, "Accessibility": 70,
            "Design Systems": 70, "State Management": 80, "Git": 85,
        },
        "backend_developer": {
            "Node.js": 85, "Python": 80, "PostgreSQL": 85, "Redis": 70,
            "Docker": 80, "Microservices": 75, "REST API": 90,
            "System Design": 80, "Security": 70, "Testing": 80,
        },
        "ml_engineer": {
            "Python": 90, "TensorFlow": 80, "Scikit-learn": 85,
            "NLP": 70, "Deep Learning": 75, "SQL": 70,
            "Docker": 60, "MLOps": 65, "Statistics": 80, "Math": 75,
        },
        "devops_engineer": {
            "Docker": 90, "Kubernetes": 85, "AWS": 85, "Terraform": 80,
            "Linux": 85, "CI/CD": 90, "Python": 70, "Monitoring": 80,
            "Networking": 75, "Security": 75,
        },
    }

    # Skill category mapping
    SKILL_CATEGORIES = {
        "language": ["python", "javascript", "typescript", "java", "go", "rust", "c++"],
        "framework": ["react", "angular", "vue", "next.js", "django", "flask", "express", "nestjs"],
        "database": ["postgresql", "mysql", "mongodb", "redis", "elasticsearch"],
        "cloud": ["aws", "azure", "gcp", "docker", "kubernetes", "terraform"],
        "ai_ml": ["tensorflow", "pytorch", "scikit-learn", "nlp", "deep learning"],
        "tools": ["git", "ci/cd", "testing", "monitoring", "linux"],
    }

    def analyze(
        self,
        user_skills: List[str],
        target_role: str = "full_stack_developer",
        user_skill_levels: Dict[str, int] = None,
    ) -> Dict[str, Any]:
        """Analyze skill gaps for a target role."""

        requirements = self.ROLE_REQUIREMENTS.get(
            target_role.lower().replace(" ", "_"),
            self.ROLE_REQUIREMENTS["full_stack_developer"]
        )

        # Default skill levels if not provided
        if user_skill_levels is None:
            user_skill_levels = {s: 70 for s in user_skills}  # Default 70%

        # Analyze each required skill
        analysis = []
        matched = 0
        gaps = 0
        total_score = 0

        for skill, required_level in requirements.items():
            user_level = 0
            # Check if user has this skill (case-insensitive)
            for us in user_skills:
                if us.lower() == skill.lower():
                    user_level = user_skill_levels.get(us, 70)
                    break

            if user_level >= required_level:
                status = "match" if user_level == required_level else "exceed"
                matched += 1
                priority = "low"
            else:
                status = "gap"
                gaps += 1
                gap_size = required_level - user_level
                priority = "high" if gap_size > 40 else "medium" if gap_size > 20 else "low"

            score = min(user_level / required_level, 1.0) * 100
            total_score += score

            analysis.append({
                "skill": skill,
                "user_level": user_level,
                "required_level": required_level,
                "status": status,
                "priority": priority,
                "gap": max(0, required_level - user_level),
            })

        # Sort: gaps first (by priority), then matches
        priority_order = {"high": 0, "medium": 1, "low": 2}
        analysis.sort(key=lambda x: (
            0 if x["status"] == "gap" else 1,
            priority_order.get(x["priority"], 2),
        ))

        overall_score = round(total_score / len(requirements), 1) if requirements else 0

        # Category analysis
        categories = self._analyze_categories(user_skills)

        # Learning path
        learning_path = self._generate_learning_path(
            [a for a in analysis if a["status"] == "gap"]
        )

        return {
            "target_role": target_role,
            "overall_readiness": overall_score,
            "summary": {
                "total_skills_required": len(requirements),
                "matched": matched,
                "gaps": gaps,
                "overall_score": overall_score,
            },
            "skills": analysis,
            "category_analysis": categories,
            "learning_path": learning_path,
            "estimated_time_to_ready": self._estimate_time(
                [a for a in analysis if a["status"] == "gap"]
            ),
        }

    def _analyze_categories(self, user_skills: List[str]) -> Dict[str, Any]:
        """Analyze skill coverage by category."""
        result = {}
        user_lower = {s.lower() for s in user_skills}

        for category, skills in self.SKILL_CATEGORIES.items():
            covered = [s for s in skills if s in user_lower]
            result[category] = {
                "coverage": round(len(covered) / len(skills) * 100, 1),
                "covered": covered,
                "missing": [s for s in skills if s not in user_lower][:3],
            }

        return result

    def _generate_learning_path(self, gaps: List[Dict]) -> List[Dict]:
        """Generate ordered learning path for skill gaps."""
        path = []
        for i, gap in enumerate(gaps[:5]):  # Top 5 gaps
            path.append({
                "order": i + 1,
                "skill": gap["skill"],
                "current": gap["user_level"],
                "target": gap["required_level"],
                "estimated_weeks": max(1, gap["gap"] // 10),
                "resources": [
                    f"Online course: {gap['skill']} Fundamentals",
                    f"Practice: Build a project using {gap['skill']}",
                ],
            })
        return path

    def _estimate_time(self, gaps: List[Dict]) -> str:
        """Estimate total time to close all gaps."""
        total_weeks = sum(max(1, g["gap"] // 10) for g in gaps)
        if total_weeks <= 4:
            return "1 month"
        elif total_weeks <= 12:
            return f"{total_weeks // 4} months"
        else:
            return f"{total_weeks // 4}-{total_weeks // 4 + 1} months"
