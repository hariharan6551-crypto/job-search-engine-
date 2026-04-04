'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Bookmark, ExternalLink, TrendingUp } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  skills: string[];
  matchScore?: number;
  posted: string;
  logo: string;
}

interface JobCardProps {
  job: Job;
}

function getScoreColor(score: number) {
  if (score >= 90) return 'text-neon-green';
  if (score >= 75) return 'text-neon-cyan';
  if (score >= 60) return 'text-yellow-400';
  return 'text-orange-400';
}

function getScoreBg(score: number) {
  if (score >= 90) return 'from-neon-green/20 to-neon-green/5';
  if (score >= 75) return 'from-neon-cyan/20 to-neon-cyan/5';
  if (score >= 60) return 'from-yellow-400/20 to-yellow-400/5';
  return 'from-orange-400/20 to-orange-400/5';
}

export function JobCard({ job }: JobCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-card p-6 cursor-pointer group relative overflow-hidden"
    >
      {/* Match Score Badge */}
      <div className="absolute top-4 right-4">
        <div
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r ${getScoreBg(
            job.matchScore ?? 0
          )}`}
        >
          <TrendingUp className={`w-3.5 h-3.5 ${getScoreColor(job.matchScore ?? 0)}`} />
          <span className={`text-xs font-bold ${getScoreColor(job.matchScore ?? 0)}`}>
            {job.matchScore ?? 0}% Match
          </span>
        </div>
      </div>

      {/* Company Info */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl border border-white/10">
          {job.logo}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground group-hover:text-neon-cyan transition-colors truncate pr-20">
            {job.title}
          </h3>
          <p className="text-sm text-muted-foreground">{job.company}</p>
        </div>
      </div>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-neon-green" />
          {job.location}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-neon-cyan" />
          {job.posted}
        </span>
      </div>

      {/* Salary & Type */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm font-semibold text-neon-cyan">{job.salary}</span>
        <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground">
          {job.type}
        </span>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-5">
        {job.skills.map((skill) => (
          <span key={skill} className="skill-badge">
            {skill}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        <button className="flex-1 btn-neon text-xs py-2.5 flex items-center justify-center gap-2">
          <ExternalLink className="w-3.5 h-3.5" />
          View Details
        </button>
        <button className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-neon-cyan transition-all">
          <Bookmark className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
