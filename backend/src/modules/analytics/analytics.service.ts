import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  async getPlatformStats() {
    return {
      totalJobs: 14580,
      activeUsers: 8920,
      resumesParsed: 3450,
      matchesMade: 28700,
      companiesHiring: 1240,
      avgMatchScore: 78.5,
      timestamp: new Date().toISOString(),
    };
  }

  async getTrendingSkills() {
    return {
      skills: [
        { name: 'React', demand: 2340, growth: '+15%', avgSalary: 1800000, category: 'framework' },
        { name: 'TypeScript', demand: 1890, growth: '+23%', avgSalary: 1900000, category: 'language' },
        { name: 'Python', demand: 3100, growth: '+18%', avgSalary: 1700000, category: 'language' },
        { name: 'AWS', demand: 1560, growth: '+12%', avgSalary: 2200000, category: 'cloud' },
        { name: 'Docker', demand: 980, growth: '+20%', avgSalary: 2000000, category: 'devops' },
        { name: 'Kubernetes', demand: 720, growth: '+28%', avgSalary: 2400000, category: 'devops' },
        { name: 'Go', demand: 540, growth: '+35%', avgSalary: 2100000, category: 'language' },
        { name: 'Next.js', demand: 890, growth: '+30%', avgSalary: 1800000, category: 'framework' },
        { name: 'Machine Learning', demand: 670, growth: '+22%', avgSalary: 2300000, category: 'ai' },
        { name: 'Rust', demand: 320, growth: '+45%', avgSalary: 2500000, category: 'language' },
      ],
      updatedAt: new Date().toISOString(),
    };
  }

  async getJobMarketAnalytics(location?: string, period?: string) {
    return {
      period: period || '30d',
      location: location || 'All India',
      overview: {
        totalPostings: 14580,
        newThisWeek: 1240,
        avgTimeToHire: '18 days',
        competitionIndex: 3.2,
      },
      byType: [
        { type: 'Full-time', count: 8900, percentage: 61 },
        { type: 'Remote', count: 2800, percentage: 19 },
        { type: 'Contract', count: 1200, percentage: 8 },
        { type: 'Hybrid', count: 980, percentage: 7 },
        { type: 'Internship', count: 500, percentage: 3 },
        { type: 'Part-time', count: 200, percentage: 2 },
      ],
      byLocation: [
        { city: 'Bangalore', count: 5420, growth: '+18%' },
        { city: 'Chennai', count: 2870, growth: '+12%' },
        { city: 'Hyderabad', count: 3200, growth: '+14%' },
        { city: 'Coimbatore', count: 1240, growth: '+25%' },
        { city: 'Kochi', count: 890, growth: '+15%' },
        { city: 'Pune', count: 1960, growth: '+10%' },
      ],
      topCompanies: [
        { name: 'Google', openings: 45 },
        { name: 'Zoho', openings: 120 },
        { name: 'Freshworks', openings: 85 },
        { name: 'Infosys', openings: 200 },
        { name: 'TCS', openings: 350 },
      ],
    };
  }

  async getUserInsights() {
    return {
      profileStrength: 82,
      profileViews: 156,
      searchAppearances: 340,
      applicationsSubmitted: 24,
      interviewInvites: 8,
      averageMatchScore: 81,
      topMatchingRoles: [
        'Full-Stack Developer',
        'Senior Frontend Engineer',
        'React Developer',
      ],
      weeklyActivity: [
        { day: 'Mon', applications: 3, views: 22 },
        { day: 'Tue', applications: 1, views: 28 },
        { day: 'Wed', applications: 2, views: 25 },
        { day: 'Thu', applications: 0, views: 18 },
        { day: 'Fri', applications: 4, views: 32 },
        { day: 'Sat', applications: 1, views: 15 },
        { day: 'Sun', applications: 0, views: 12 },
      ],
    };
  }

  async getSalaryTrends(role?: string, location?: string) {
    return {
      role: role || 'Software Engineer',
      location: location || 'All India',
      trends: [
        { year: 2022, median: 1200000, p25: 800000, p75: 1800000 },
        { year: 2023, median: 1400000, p25: 900000, p75: 2100000 },
        { year: 2024, median: 1600000, p25: 1000000, p75: 2400000 },
        { year: 2025, median: 1800000, p25: 1200000, p75: 2800000 },
        { year: 2026, median: 2000000, p25: 1400000, p75: 3200000 },
      ],
      byExperience: [
        { range: '0-2 years', median: 600000 },
        { range: '2-5 years', median: 1400000 },
        { range: '5-8 years', median: 2200000 },
        { range: '8-12 years', median: 3200000 },
        { range: '12+ years', median: 4500000 },
      ],
    };
  }
}
