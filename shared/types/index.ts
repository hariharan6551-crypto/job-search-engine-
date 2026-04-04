// ===== SHARED TYPES =====
// Used by both frontend and backend

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  skills?: string[];
  experienceYears?: number;
  avatar?: string;
  role: 'user' | 'admin' | 'employer';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IJob {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Hybrid' | 'Internship';
  skills: string[];
  description?: string;
  requirements?: string[];
  benefits?: string[];
  source?: string;
  sourceUrl?: string;
  isActive: boolean;
  latitude?: number;
  longitude?: number;
  postedAt: string;
  deadline?: string;
}

export interface IResume {
  id: string;
  userId: string;
  fileName: string;
  fileUrl?: string;
  parsedSkills?: string[];
  parsedExperience?: string;
  parsedEducation?: string;
  qualityScore?: number;
  uploadedAt: string;
  analyzedAt?: string;
}

export interface IJobScore {
  userId: string;
  jobId: string;
  skillMatch: number;
  locationMatch: number;
  salaryMatch: number;
  experienceMatch: number;
  overallScore: number;
  matchReasons: string[];
  calculatedAt: string;
}

export interface IApplication {
  id: string;
  userId: string;
  jobId: string;
  resumeId?: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'interview' | 'rejected' | 'accepted';
  appliedAt: string;
}

export interface IPaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IApiError {
  statusCode: number;
  message: string;
  timestamp: string;
  path?: string;
}
