// ===== USER =====
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  location?: string;
  skills?: string[];
  experience?: number;
  createdAt: string;
  updatedAt: string;
}

// ===== JOB =====
export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  salary: string;
  salaryMin?: number;
  salaryMax?: number;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Hybrid';
  skills: string[];
  description?: string;
  requirements?: string[];
  benefits?: string[];
  matchScore?: number;
  posted: string;
  deadline?: string;
  source?: 'indeed' | 'linkedin' | 'naukri' | 'direct';
  url?: string;
  logo: string;
}

// ===== JOB FILTERS =====
export interface JobFilters {
  location?: string;
  type?: string;
  salaryMin?: number;
  salaryMax?: number;
  skills?: string[];
  page?: number;
  limit?: number;
  sortBy?: 'relevance' | 'date' | 'salary';
  query?: string;
}

// ===== RESUME =====
export interface Resume {
  id: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  parsedData?: ResumeAnalysis;
  uploadedAt: string;
}

export interface ResumeAnalysis {
  skills: string[];
  experience: string;
  education: string;
  certifications?: string[];
  summary?: string;
  score: number;
}

// ===== APPLICATION =====
export interface Application {
  id: string;
  userId: string;
  jobId: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'accepted';
  appliedAt: string;
  job?: Job;
}

// ===== JOB SCORE =====
export interface JobScore {
  jobId: string;
  userId: string;
  skillMatch: number;
  locationMatch: number;
  salaryMatch: number;
  overallScore: number;
}

// ===== API RESPONSE =====
export interface ApiResponse<T> {
  data: T;
  message?: string;
  total?: number;
  page?: number;
  limit?: number;
}

// ===== AUTH =====
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
