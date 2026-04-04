/**
 * Job Parser
 * Normalizes scraped job data from different sources into a unified format
 */

export interface RawJobData {
  title: string;
  company: string;
  location: string;
  salary?: string;
  description: string;
  url: string;
  postedDate: string;
  source: string;
}

export interface NormalizedJob {
  title: string;
  company: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  type: string;
  skills: string[];
  description: string;
  sourceUrl: string;
  source: string;
  postedAt: Date;
}

export class JobParser {
  private skillKeywords = [
    'react', 'angular', 'vue', 'node', 'python', 'java', 'go', 'rust',
    'typescript', 'javascript', 'sql', 'mongodb', 'postgresql', 'redis',
    'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'terraform',
    'tensorflow', 'pytorch', 'machine learning', 'deep learning',
    'html', 'css', 'tailwind', 'next.js', 'express', 'django', 'flask',
    'git', 'ci/cd', 'agile', 'scrum', 'rest api', 'graphql',
  ];

  normalize(raw: RawJobData): NormalizedJob {
    return {
      title: this.cleanTitle(raw.title),
      company: raw.company.trim(),
      location: this.normalizeLocation(raw.location),
      salaryMin: this.parseSalaryMin(raw.salary),
      salaryMax: this.parseSalaryMax(raw.salary),
      type: this.detectJobType(raw.title + ' ' + raw.description),
      skills: this.extractSkills(raw.title + ' ' + raw.description),
      description: raw.description.trim(),
      sourceUrl: raw.url,
      source: raw.source,
      postedAt: new Date(raw.postedDate),
    };
  }

  private cleanTitle(title: string): string {
    return title.replace(/\s+/g, ' ').trim().slice(0, 500);
  }

  private normalizeLocation(location: string): string {
    const mapping: Record<string, string> = {
      'bengaluru': 'Bangalore, Karnataka',
      'blr': 'Bangalore, Karnataka',
      'mumbai': 'Mumbai, Maharashtra',
      'pune': 'Pune, Maharashtra',
      'cbe': 'Coimbatore, Tamil Nadu',
    };
    const lower = location.toLowerCase().trim();
    return mapping[lower] || location.trim();
  }

  private parseSalaryMin(salary?: string): number | undefined {
    if (!salary) return undefined;
    const match = salary.match(/(\d+\.?\d*)\s*(?:L|lakh|LPA)/i);
    return match ? parseFloat(match[1]) * 100000 : undefined;
  }

  private parseSalaryMax(salary?: string): number | undefined {
    if (!salary) return undefined;
    const matches = salary.match(/(\d+\.?\d*)\s*(?:L|lakh|LPA)/gi);
    if (matches && matches.length >= 2) {
      const last = matches[matches.length - 1];
      const num = last.match(/(\d+\.?\d*)/);
      return num ? parseFloat(num[1]) * 100000 : undefined;
    }
    return undefined;
  }

  private detectJobType(text: string): string {
    const lower = text.toLowerCase();
    if (lower.includes('remote')) return 'Remote';
    if (lower.includes('hybrid')) return 'Hybrid';
    if (lower.includes('contract') || lower.includes('freelance')) return 'Contract';
    if (lower.includes('part-time') || lower.includes('part time')) return 'Part-time';
    if (lower.includes('internship') || lower.includes('intern')) return 'Internship';
    return 'Full-time';
  }

  private extractSkills(text: string): string[] {
    const lower = text.toLowerCase();
    return this.skillKeywords
      .filter((skill) => {
        const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        return regex.test(lower);
      })
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1));
  }
}

export default JobParser;
