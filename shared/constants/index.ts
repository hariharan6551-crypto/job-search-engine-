// ===== SHARED CONSTANTS =====

export const APP_NAME = 'JobAI';
export const APP_VERSION = '1.0.0';

// API Endpoints
export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
  },
  JOBS: {
    LIST: '/jobs',
    SEARCH: '/jobs/search',
    DETAIL: (id: string) => `/jobs/${id}`,
  },
  RESUME: {
    UPLOAD: '/resume/upload',
    ANALYSIS: (id: string) => `/resume/${id}/analysis`,
  },
  RECOMMENDATIONS: {
    LIST: '/recommendations',
    TRENDING: '/recommendations/trending',
  },
  LOCATION: {
    NEARBY: '/location/nearby-jobs',
    CITIES: '/location/cities',
  },
} as const;

// Job Types
export const JOB_TYPES = [
  'Full-time',
  'Part-time',
  'Contract',
  'Remote',
  'Hybrid',
  'Internship',
] as const;

// Priority Locations (South India focus)
export const PRIORITY_LOCATIONS = [
  { city: 'Coimbatore', state: 'Tamil Nadu', priority: 1 },
  { city: 'Chennai', state: 'Tamil Nadu', priority: 1 },
  { city: 'Bangalore', state: 'Karnataka', priority: 1 },
  { city: 'Kochi', state: 'Kerala', priority: 1 },
  { city: 'Hyderabad', state: 'Telangana', priority: 2 },
  { city: 'Madurai', state: 'Tamil Nadu', priority: 2 },
  { city: 'Thiruvananthapuram', state: 'Kerala', priority: 2 },
  { city: 'Mysore', state: 'Karnataka', priority: 3 },
  { city: 'Trichy', state: 'Tamil Nadu', priority: 3 },
  { city: 'Salem', state: 'Tamil Nadu', priority: 3 },
] as const;

// Salary Ranges (in INR)
export const SALARY_RANGES = [
  { label: '₹0 - ₹5L', min: 0, max: 500000 },
  { label: '₹5L - ₹10L', min: 500000, max: 1000000 },
  { label: '₹10L - ₹20L', min: 1000000, max: 2000000 },
  { label: '₹20L - ₹35L', min: 2000000, max: 3500000 },
  { label: '₹35L+', min: 3500000, max: Infinity },
] as const;

// File Upload
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_MIME_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  ALLOWED_EXTENSIONS: ['.pdf', '.doc', '.docx'],
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;
