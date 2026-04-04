'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search, SlidersHorizontal, MapPin, Briefcase, Clock, Bookmark,
  Building2, DollarSign, ExternalLink, Sparkles, TrendingUp,
} from 'lucide-react';
import { FilterRibbon } from '@/components/FilterRibbon';
import { SmartSearchBar } from '@/components/SmartSearchBar';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  skills: string[];
  postedAt: string;
  matchScore: number;
  matchReasons: string[];
  saved: boolean;
}

const mockJobs: Job[] = [
  {
    id: '1', title: 'Senior Full-Stack Engineer', company: 'TechCorp India',
    location: 'Bangalore, Karnataka', type: 'Full-time', salary: '₹18L - ₹28L',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    postedAt: '2 hours ago', matchScore: 95,
    matchReasons: ['Skill match: React, Node.js, TypeScript', 'Location: Preferred region'],
    saved: false,
  },
  {
    id: '2', title: 'AI/ML Engineer', company: 'DataVerse AI',
    location: 'Coimbatore, Tamil Nadu', type: 'Full-time', salary: '₹15L - ₹25L',
    skills: ['Python', 'TensorFlow', 'NLP', 'FastAPI'],
    postedAt: '5 hours ago', matchScore: 88,
    matchReasons: ['Strong Python proficiency', 'Growing AI hub'],
    saved: true,
  },
  {
    id: '3', title: 'DevOps Cloud Architect', company: 'CloudNine Solutions',
    location: 'Chennai, Tamil Nadu', type: 'Remote', salary: '₹20L - ₹35L',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    postedAt: '1 day ago', matchScore: 82,
    matchReasons: ['Cloud skills alignment', 'Remote work available'],
    saved: false,
  },
  {
    id: '4', title: 'Frontend Architect', company: 'DesignFlow Labs',
    location: 'Bangalore, Karnataka', type: 'Hybrid', salary: '₹22L - ₹38L',
    skills: ['React', 'TypeScript', 'Next.js', 'System Design'],
    postedAt: '2 days ago', matchScore: 79,
    matchReasons: ['React expertise match', 'Growth opportunity'],
    saved: false,
  },
  {
    id: '5', title: 'Python Backend Developer', company: 'PyWorks Studio',
    location: 'Chennai, Tamil Nadu', type: 'Full-time', salary: '₹12L - ₹22L',
    skills: ['Python', 'Django', 'PostgreSQL', 'Redis'],
    postedAt: '3 days ago', matchScore: 74,
    matchReasons: ['Python skill match', 'South India location'],
    saved: false,
  },
  {
    id: '6', title: 'React Native Developer', company: 'AppForge Mobile',
    location: 'Kochi, Kerala', type: 'Full-time', salary: '₹10L - ₹18L',
    skills: ['React', 'JavaScript', 'Redux', 'Firebase'],
    postedAt: '3 days ago', matchScore: 71,
    matchReasons: ['React experience', 'Mobile development opportunity'],
    saved: false,
  },
];

function getScoreColor(score: number) {
  if (score >= 90) return 'text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10';
  if (score >= 80) return 'text-neon-green border-neon-green/30 bg-neon-green/10';
  if (score >= 70) return 'text-neon-purple border-neon-purple/30 bg-neon-purple/10';
  return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
}

function getScoreStroke(score: number) {
  if (score >= 90) return '#00f5ff';
  if (score >= 80) return '#39ff14';
  if (score >= 70) return '#bf00ff';
  return '#facc15';
}

export default function JobsPage() {
  const [jobs, setJobs] = useState(mockJobs);
  const [savedOnly, setSavedOnly] = useState(false);

  const toggleSave = (id: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, saved: !j.saved } : j))
    );
  };

  const displayJobs = savedOnly ? jobs.filter((j) => j.saved) : jobs;

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Search Section */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold font-heading text-center mb-6"
          >
            <span className="text-gradient">AI-Powered Job Search</span>
          </motion.h1>
          <SmartSearchBar />
        </div>
      </section>

      {/* Filter Ribbon */}
      <FilterRibbon />

      {/* Results Section */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Showing <span className="text-foreground font-semibold">{displayJobs.length}</span> AI-ranked results
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSavedOnly(!savedOnly)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${
                  savedOnly
                    ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20'
                    : 'bg-white/5 text-muted-foreground hover:bg-white/10'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                Saved
              </button>
            </div>
          </div>

          {/* Job Cards */}
          <div className="space-y-4">
            {displayJobs.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                className="glass-card p-5 md:p-6 hover:neon-border transition-all duration-300 group"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {/* Match Score Circle */}
                  <div className="relative w-16 h-16 shrink-0 mx-auto md:mx-0">
                    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5" />
                      <circle
                        cx="18" cy="18" r="15" fill="none"
                        stroke={getScoreStroke(job.matchScore)}
                        strokeWidth="2.5"
                        strokeDasharray={`${(job.matchScore / 100) * 94.2} 94.2`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-sm font-bold">{job.matchScore}%</span>
                      <span className="text-[8px] text-muted-foreground">match</span>
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="flex-1 min-w-0 text-center md:text-left">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold group-hover:text-neon-cyan transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground justify-center md:justify-start">
                          <span className="flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5" />
                            {job.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3.5 h-3.5" />
                            {job.salary}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSave(job.id)}
                        className={`p-2 rounded-lg transition-all shrink-0 hidden md:block ${
                          job.saved ? 'text-neon-cyan bg-neon-cyan/10' : 'text-muted-foreground hover:text-neon-cyan hover:bg-white/5'
                        }`}
                      >
                        <Bookmark className={`w-5 h-5 ${job.saved ? 'fill-neon-cyan' : ''}`} />
                      </button>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 mt-3 justify-center md:justify-start">
                      {job.skills.map((skill) => (
                        <span key={skill} className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-white/5 border border-white/10 text-muted-foreground">
                          {skill}
                        </span>
                      ))}
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-neon-cyan/5 border border-neon-cyan/10 text-neon-cyan">
                        {job.type}
                      </span>
                    </div>

                    {/* AI Match Reasons */}
                    <div className="mt-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Sparkles className="w-3 h-3 text-neon-cyan" />
                        <span className="text-[10px] font-semibold text-neon-cyan uppercase tracking-wider">AI Match Insight</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {job.matchReasons.join(' · ')}
                      </p>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {job.postedAt}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleSave(job.id)}
                          className={`md:hidden p-1.5 rounded-lg transition-all ${
                            job.saved ? 'text-neon-cyan' : 'text-muted-foreground'
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 ${job.saved ? 'fill-neon-cyan' : ''}`} />
                        </button>
                        <button className="btn-primary-gradient px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                          Apply Now <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
