import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AiRecommendationService {
  private readonly aiEngineUrl = process.env.NEXT_PUBLIC_AI_API_URL || 'http://localhost:8000';

  async getRecommendations(userId: string, limit: number = 10) {
    try {
      const response = await axios.post(`${this.aiEngineUrl}/match-jobs`, {
        user_id: userId,
        limit,
      });
      return {
        recommendations: response.data.matches || [],
        generatedAt: new Date().toISOString(),
      };
    } catch {
      // Fallback: return placeholder recommendations
      return {
        recommendations: [
          {
            jobId: '1',
            title: 'Senior Full-Stack Engineer',
            company: 'TechCorp',
            matchScore: 95,
            matchReasons: ['Skill match: React, Node.js', 'Location: Bangalore'],
          },
          {
            jobId: '2',
            title: 'AI/ML Engineer',
            company: 'DataVerse',
            matchScore: 88,
            matchReasons: ['Skill match: Python, ML', 'Experience alignment'],
          },
        ],
        generatedAt: new Date().toISOString(),
      };
    }
  }

  async getTrendingSkills() {
    return {
      trendingSkills: [
        { skill: 'React', demand: '+15%', openings: 2340 },
        { skill: 'TypeScript', demand: '+23%', openings: 1890 },
        { skill: 'Python', demand: '+18%', openings: 3100 },
        { skill: 'AWS', demand: '+12%', openings: 1560 },
        { skill: 'Docker', demand: '+20%', openings: 980 },
      ],
      trendingLocations: [
        { city: 'Bangalore', openings: 5400 },
        { city: 'Chennai', openings: 2800 },
        { city: 'Coimbatore', openings: 1200 },
        { city: 'Kochi', openings: 890 },
      ],
    };
  }
}
