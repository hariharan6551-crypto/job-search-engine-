'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, TrendingUp, Zap } from 'lucide-react';

interface SkillGapData {
  skill: string;
  userLevel: number;     // 0–100
  requiredLevel: number; // 0–100
  status: 'match' | 'gap' | 'exceed';
  priority: 'high' | 'medium' | 'low';
}

const mockSkillGap: SkillGapData[] = [
  { skill: 'React', userLevel: 90, requiredLevel: 85, status: 'exceed', priority: 'low' },
  { skill: 'TypeScript', userLevel: 75, requiredLevel: 90, status: 'gap', priority: 'high' },
  { skill: 'Node.js', userLevel: 80, requiredLevel: 80, status: 'match', priority: 'low' },
  { skill: 'Docker', userLevel: 40, requiredLevel: 75, status: 'gap', priority: 'high' },
  { skill: 'AWS', userLevel: 30, requiredLevel: 70, status: 'gap', priority: 'high' },
  { skill: 'PostgreSQL', userLevel: 70, requiredLevel: 65, status: 'exceed', priority: 'low' },
  { skill: 'System Design', userLevel: 45, requiredLevel: 80, status: 'gap', priority: 'medium' },
  { skill: 'CI/CD', userLevel: 50, requiredLevel: 70, status: 'gap', priority: 'medium' },
];

function getBarColor(status: string) {
  if (status === 'exceed') return 'bg-neon-green';
  if (status === 'match') return 'bg-neon-cyan';
  return 'bg-orange-400';
}

function getRequiredBarColor() {
  return 'bg-white/10';
}

function getPriorityBadge(priority: string) {
  const styles = {
    high: 'bg-red-500/10 text-red-400 border-red-500/20',
    medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    low: 'bg-green-500/10 text-green-400 border-green-500/20',
  };
  return styles[priority as keyof typeof styles];
}

export function SkillGapAnalyzer() {
  const gaps = mockSkillGap.filter((s) => s.status === 'gap');
  const matches = mockSkillGap.filter((s) => s.status !== 'gap');

  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold font-heading">Skill Gap Analysis</h3>
          <p className="text-sm text-muted-foreground">Your profile vs top job requirements</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-3 rounded-xl bg-neon-green/5 border border-neon-green/10 text-center">
          <p className="text-2xl font-bold text-neon-green">{matches.length}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Matched</p>
        </div>
        <div className="p-3 rounded-xl bg-orange-400/5 border border-orange-400/10 text-center">
          <p className="text-2xl font-bold text-orange-400">{gaps.length}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Gaps</p>
        </div>
        <div className="p-3 rounded-xl bg-neon-cyan/5 border border-neon-cyan/10 text-center">
          <p className="text-2xl font-bold text-neon-cyan">
            {Math.round(mockSkillGap.reduce((sum, s) => sum + Math.min(s.userLevel / s.requiredLevel, 1), 0) / mockSkillGap.length * 100)}%
          </p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Overall</p>
        </div>
      </div>

      {/* Skill Bars */}
      <div className="space-y-4">
        {mockSkillGap.map((skill, idx) => (
          <motion.div
            key={skill.skill}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                {skill.status === 'gap' ? (
                  <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
                ) : (
                  <CheckCircle className="w-3.5 h-3.5 text-neon-green" />
                )}
                <span className="text-sm font-medium">{skill.skill}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getPriorityBadge(skill.priority)}`}>
                  {skill.priority}
                </span>
                <span className="text-xs text-muted-foreground">
                  {skill.userLevel}% / {skill.requiredLevel}%
                </span>
              </div>
            </div>
            <div className="relative h-2 rounded-full overflow-hidden bg-white/5">
              {/* Required level (background) */}
              <div
                className={`absolute inset-y-0 left-0 rounded-full ${getRequiredBarColor()}`}
                style={{ width: `${skill.requiredLevel}%` }}
              />
              {/* User level (foreground) */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.userLevel}%` }}
                transition={{ duration: 0.8, delay: idx * 0.05 }}
                className={`absolute inset-y-0 left-0 rounded-full ${getBarColor(skill.status)}`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recommendations */}
      {gaps.length > 0 && (
        <div className="mt-6 p-4 rounded-xl bg-orange-400/5 border border-orange-400/10">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-semibold text-orange-400">Priority Learning</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Focus on <strong className="text-foreground">{gaps.slice(0, 3).map((g) => g.skill).join(', ')}</strong> — 
            these are the most in-demand skills for your target roles. Bridging these gaps can increase your match score by up to 25%.
          </p>
        </div>
      )}
    </div>
  );
}
