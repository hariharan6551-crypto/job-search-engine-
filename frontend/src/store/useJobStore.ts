import { create } from 'zustand';
import type { Job, JobFilters } from '@/types';

interface JobState {
  jobs: Job[];
  selectedJob: Job | null;
  filters: JobFilters;
  isLoading: boolean;
  totalCount: number;
  searchQuery: string;
  setJobs: (jobs: Job[]) => void;
  setSelectedJob: (job: Job | null) => void;
  setFilters: (filters: Partial<JobFilters>) => void;
  setLoading: (loading: boolean) => void;
  setTotalCount: (count: number) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

const defaultFilters: JobFilters = {
  location: undefined,
  type: undefined,
  salaryMin: undefined,
  salaryMax: undefined,
  skills: [],
  page: 1,
  limit: 20,
  sortBy: 'relevance',
};

export const useJobStore = create<JobState>((set) => ({
  jobs: [],
  selectedJob: null,
  filters: defaultFilters,
  isLoading: false,
  totalCount: 0,
  searchQuery: '',
  setJobs: (jobs) => set({ jobs }),
  setSelectedJob: (job) => set({ selectedJob: job }),
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  setLoading: (isLoading) => set({ isLoading }),
  setTotalCount: (totalCount) => set({ totalCount }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  resetFilters: () => set({ filters: defaultFilters }),
}));
