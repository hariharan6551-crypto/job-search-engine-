'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, BookOpen, TrendingUp, Target } from 'lucide-react';

interface CareerStep {
  title: string;
  level: string;
  salaryRange: string;
  timeframe: string;
  requiredSkills: string[];
  status: 'current' | 'next' | 'future';
}

const careerPath: CareerStep[] = [
  {
    title: 'Full-Stack Developer',
    level: 'Mid-level',
    salaryRange: '₹12L - ₹18L',
    timeframe: 'Current',
    requiredSkills: ['React', 'Node.js', 'PostgreSQL'],
    status: 'current',
  },
  {
    title: 'Senior Full-Stack Engineer',
    level: 'Senior',
    salaryRange: '₹18L - ₹28L',
    timeframe: '1-2 years',
    requiredSkills: ['System Design', 'TypeScript', 'AWS', 'Leadership'],
    status: 'next',
  },
  {
    title: 'Tech Lead / Staff Engineer',
    level: 'Lead',
    salaryRange: '₹28L - ₹45L',
    timeframe: '3-5 years',
    requiredSkills: ['Architecture', 'Team Management', 'Microservices', 'DevOps'],
    status: 'future',
  },
  {
    title: 'Engineering Manager / Architect',
    level: 'Principal',
    salaryRange: '₹45L - ₹70L',
    timeframe: '5-8 years',
    requiredSkills: ['Strategy', 'Cross-functional Leadership', 'Budgeting'],
    status: 'future',
  },
];

const suggestedCourses = [
  { name: 'Advanced System Design', platform: 'Frontend Masters', duration: '12 hrs', relevance: 95 },
  { name: 'AWS Solutions Architect', platform: 'AWS Training', duration: '40 hrs', relevance: 88 },
  { name: 'Engineering Leadership', platform: 'Coursera', duration: '20 hrs', relevance: 75 },
];

function getStatusStyles(status: string) {
  switch (status) {
    case 'current': return { bg: 'bg-neon-cyan/10', border: 'border-neon-cyan/30', dot: 'bg-neon-cyan', text: 'text-neon-cyan' };
    case 'next': return { bg: 'bg-neon-green/10', border: 'border-neon-green/30', dot: 'bg-neon-green', text: 'text-neon-green' };
    default: return { bg: 'bg-white/5', border: 'border-white/10', dot: 'bg-muted-foreground', text: 'text-muted-foreground' };
  }
}

export function CareerPathAI() {
  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-green flex items-center justify-center">
          <Target className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold font-heading">AI Career Path</h3>
          <p className="text-sm text-muted-foreground">Personalized career progression map</p>
        </div>
      </div>

      {/* Career Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-cyan via-neon-green to-white/10" />

        <div className="space-y-6">
          {careerPath.map((step, idx) => {
            const styles = getStatusStyles(step.status);
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.15 }}
                className="relative pl-14"
              >
                {/* Timeline dot */}
                <div className={`absolute left-3 top-3 w-5 h-5 rounded-full border-2 ${styles.border} ${styles.bg} flex items-center justify-center z-10`}>
                  <div className={`w-2 h-2 rounded-full ${styles.dot}`} />
                </div>

                {/* Card */}
                <div className={`p-4 rounded-xl border ${styles.border} ${styles.bg} transition-all hover:scale-[1.01]`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{step.title}</h4>
                      <p className="text-xs text-muted-foreground">{step.level}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${styles.text}`}>{step.salaryRange}</p>
                      <p className="text-[10px] text-muted-foreground">{step.timeframe}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {step.requiredSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/5 border border-white/10 text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  {step.status === 'current' && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-neon-cyan">
                      <Sparkles className="w-3 h-3" />
                      You are here
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Suggested Courses */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-4 h-4 text-neon-purple" />
          <h4 className="text-sm font-semibold">Recommended Courses</h4>
        </div>
        <div className="space-y-2">
          {suggestedCourses.map((course, idx) => (
            <motion.div
              key={course.name}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/8 transition-colors cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-neon-purple/10 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4 text-neon-purple" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium group-hover:text-neon-cyan transition-colors truncate">
                  {course.name}
                </p>
                <p className="text-[10px] text-muted-foreground">{course.platform} · {course.duration}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-neon-green">
                <TrendingUp className="w-3 h-3" />
                {course.relevance}%
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-neon-cyan transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
