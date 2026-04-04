"""
Salary Prediction Module
Predicts expected salary based on skills, experience, and location.
"""

from typing import List, Optional
import math


class SalaryPredictor:
    """Predict salary ranges based on user profile data."""

    # Base salary data by role (annual, INR)
    ROLE_BASE_SALARY = {
        "software_engineer": 800000,
        "senior_engineer": 1500000,
        "lead_engineer": 2200000,
        "architect": 3000000,
        "data_scientist": 1200000,
        "ml_engineer": 1400000,
        "devops_engineer": 1100000,
        "frontend_developer": 900000,
        "backend_developer": 1000000,
        "full_stack_developer": 1000000,
        "product_manager": 1500000,
        "designer": 800000,
    }

    # Skill premium multipliers
    SKILL_PREMIUMS = {
        "react": 1.05,
        "typescript": 1.08,
        "python": 1.06,
        "golang": 1.12,
        "rust": 1.15,
        "kubernetes": 1.10,
        "aws": 1.08,
        "machine learning": 1.15,
        "system design": 1.10,
        "tensorflow": 1.12,
        "docker": 1.05,
        "graphql": 1.04,
        "next.js": 1.06,
        "node.js": 1.05,
    }

    # Location multipliers
    LOCATION_MULTIPLIERS = {
        "bangalore": 1.20,
        "mumbai": 1.15,
        "delhi": 1.12,
        "hyderabad": 1.10,
        "pune": 1.08,
        "chennai": 1.05,
        "coimbatore": 0.90,
        "kochi": 0.88,
        "remote": 1.15,
        "thiruvananthapuram": 0.85,
    }

    # Experience multiplier curve
    EXPERIENCE_CURVE = {
        0: 0.60,   # Fresher
        1: 0.75,
        2: 0.85,
        3: 1.00,
        4: 1.10,
        5: 1.25,
        6: 1.35,
        7: 1.45,
        8: 1.55,
        10: 1.70,
        12: 1.85,
        15: 2.00,
    }

    def predict(
        self,
        skills: List[str],
        experience_years: int,
        location: str = "bangalore",
        current_role: str = "software_engineer",
        education: str = "bachelors",
    ) -> dict:
        """Predict salary range for a given profile."""

        # 1. Base salary
        base = self.ROLE_BASE_SALARY.get(
            current_role.lower().replace(" ", "_"),
            self.ROLE_BASE_SALARY["software_engineer"]
        )

        # 2. Experience multiplier
        exp_mult = self._get_experience_multiplier(experience_years)

        # 3. Skill premium (average of top 3 skill premiums)
        skill_premiums = sorted(
            [self.SKILL_PREMIUMS.get(s.lower(), 1.0) for s in skills],
            reverse=True
        )[:3]
        skill_mult = sum(skill_premiums) / max(len(skill_premiums), 1)

        # 4. Location multiplier
        loc_mult = self.LOCATION_MULTIPLIERS.get(
            location.lower().split(",")[0].strip(), 1.0
        )

        # 5. Education bonus
        edu_bonus = {
            "phd": 1.15,
            "masters": 1.08,
            "bachelors": 1.0,
            "diploma": 0.90,
        }.get(education.lower(), 1.0)

        # Calculate predicted salary
        predicted = base * exp_mult * skill_mult * loc_mult * edu_bonus

        # Generate range (±15%)
        salary_min = round(predicted * 0.85, -3)
        salary_max = round(predicted * 1.15, -3)

        # Breakdown
        base_component = round(predicted * 0.70, -3)
        bonus_component = round(predicted * 0.15, -3)
        stock_component = round(predicted * 0.10, -3)
        other_component = round(predicted * 0.05, -3)

        # Market comparison
        market_avg = base * exp_mult * 1.0  # Without skill/location premiums
        percentile = min(95, max(10, int(
            50 + (predicted - market_avg) / market_avg * 100
        )))

        return {
            "predicted_salary": {
                "min": int(salary_min),
                "max": int(salary_max),
                "median": int(round(predicted, -3)),
                "currency": "INR",
            },
            "breakdown": {
                "base": int(base_component),
                "bonus": int(bonus_component),
                "stock_esop": int(stock_component),
                "other_benefits": int(other_component),
            },
            "factors": {
                "experience_multiplier": round(exp_mult, 2),
                "skill_premium": round(skill_mult, 3),
                "location_multiplier": round(loc_mult, 2),
                "education_bonus": round(edu_bonus, 2),
            },
            "market_comparison": {
                "percentile": percentile,
                "market_average": int(round(market_avg, -3)),
                "above_average": predicted > market_avg,
                "difference_percent": round(
                    (predicted - market_avg) / market_avg * 100, 1
                ),
            },
            "recommendations": self._get_salary_tips(
                skills, experience_years, location, predicted, market_avg
            ),
        }

    def _get_experience_multiplier(self, years: int) -> float:
        """Interpolate experience multiplier from curve."""
        if years in self.EXPERIENCE_CURVE:
            return self.EXPERIENCE_CURVE[years]

        # Linear interpolation between known points
        keys = sorted(self.EXPERIENCE_CURVE.keys())
        for i in range(len(keys) - 1):
            if keys[i] <= years <= keys[i + 1]:
                low, high = keys[i], keys[i + 1]
                ratio = (years - low) / (high - low)
                return (
                    self.EXPERIENCE_CURVE[low]
                    + ratio * (self.EXPERIENCE_CURVE[high] - self.EXPERIENCE_CURVE[low])
                )

        return self.EXPERIENCE_CURVE[max(keys)]  # Cap at max

    def _get_salary_tips(
        self,
        skills: List[str],
        experience: int,
        location: str,
        predicted: float,
        market_avg: float,
    ) -> List[str]:
        """Generate actionable salary improvement tips."""
        tips = []

        # Check for high-premium missing skills
        user_skills_lower = {s.lower() for s in skills}
        high_premium_missing = [
            (k, v) for k, v in self.SKILL_PREMIUMS.items()
            if v >= 1.10 and k not in user_skills_lower
        ]
        if high_premium_missing:
            top = sorted(high_premium_missing, key=lambda x: -x[1])[:2]
            tips.append(
                f"Learn {top[0][0].title()} (+{int((top[0][1]-1)*100)}% premium) "
                f"to boost your salary potential"
            )

        # Location advice
        if location.lower() in ["coimbatore", "kochi", "thiruvananthapuram"]:
            tips.append(
                "Consider remote roles — remote positions pay ~15% more "
                "than your current location average"
            )

        # Experience advice
        if experience < 3:
            tips.append(
                "Focus on building 3+ years of experience — "
                "salary growth accelerates significantly after year 3"
            )

        if not tips:
            tips.append("Your profile is well-positioned in the current market")

        return tips
