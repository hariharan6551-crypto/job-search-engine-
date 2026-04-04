'use client';

import { motion } from 'framer-motion';
import { Target, TrendingUp, MapPin, Sparkles } from 'lucide-react';

interface RecommendedJob {
  id: string;
  title: string;
  company: string;
  matchScore: number;
  reason: string;
}

const mockRecommendations: RecommendedJob[] = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'TechFlow Labs',
    matchScore: 96,
    reason: 'Perfect skill match: React, TypeScript, Node.js',
  },
  {
    id: '2',
    title: 'Full-Stack Engineer',
    company: 'ScaleUp India',
    matchScore: 91,
    reason: 'Strong alignment with your 4yr experience',
  },
  {
    id: '3',
    title: 'Frontend Architect',
    company: 'DesignCore',
    matchScore: 85,
    reason: 'Location match: Coimbatore, Tamil Nadu',
  },
];

export function RecommendationPanel() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center">
          <Target className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold font-heading">AI Recommendations</h3>
          <p className="text-xs text-muted-foreground">Based on your resume analysis</p>
        </div>
      </div>

      <div className="space-y-4">
        {mockRecommendations.map((job, idx) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-neon-cyan">{job.matchScore}%</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm group-hover:text-neon-cyan transition-colors truncate">
                {job.title}
              </h4>
              <p className="text-xs text-muted-foreground">{job.company}</p>
              <p className="text-xs text-neon-green/70 mt-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {job.reason}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full btn-neon text-sm py-2 mt-4 flex items-center justify-center gap-2">
        <TrendingUp className="w-4 h-4" />
        View All Recommendations
      </button>
    </div>
  );
}
