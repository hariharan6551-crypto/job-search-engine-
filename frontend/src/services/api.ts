import axios from 'axios';
import type { Job, User, ResumeAnalysis, JobFilters } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const AI_API_URL = process.env.NEXT_PUBLIC_AI_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

const aiApi = axios.create({
  baseURL: AI_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ===== AUTH SERVICE =====
export const authService = {
  login: async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  },
  register: async (payload: { name: string; email: string; password: string }) => {
    const { data } = await api.post('/auth/register', payload);
    return data;
  },
  getProfile: async () => {
    const { data } = await api.get('/auth/profile');
    return data;
  },
};

// ===== JOB SERVICE =====
export const jobService = {
  getJobs: async (filters?: JobFilters): Promise<{ data: Job[]; total: number }> => {
    const { data } = await api.get('/jobs', { params: filters });
    return data;
  },
  getJobById: async (id: string): Promise<Job> => {
    const { data } = await api.get(`/jobs/${id}`);
    return data;
  },
  searchJobs: async (query: string, location?: string) => {
    const { data } = await api.get('/jobs/search', { params: { q: query, location } });
    return data;
  },
};

// ===== RESUME SERVICE =====
export const resumeService = {
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append('resume', file);
    const { data } = await api.post('/resume/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
  getAnalysis: async (resumeId: string): Promise<ResumeAnalysis> => {
    const { data } = await api.get(`/resume/${resumeId}/analysis`);
    return data;
  },
};

// ===== AI SERVICE =====
export const aiService = {
  parseResume: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await aiApi.post('/parse-resume', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
  matchJobs: async (resumeData: Record<string, unknown>) => {
    const { data } = await aiApi.post('/match-jobs', resumeData);
    return data;
  },
};

// ===== RECOMMENDATION SERVICE =====
export const recommendationService = {
  getRecommendations: async () => {
    const { data } = await api.get('/recommendations');
    return data;
  },
};

export default api;
