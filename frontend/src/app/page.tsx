'use client';

import { motion } from 'framer-motion';
import { SmartSearchBar } from '@/components/SmartSearchBar';
import { FilterRibbon } from '@/components/FilterRibbon';
import { JobCard } from '@/components/JobCard';
import { StatsPanel } from '@/components/StatsPanel';
import { AIInsights } from '@/components/AIInsights';
import { LocationHeatmap } from '@/components/LocationHeatmap';
import { SkillGapAnalyzer } from '@/components/SkillGapAnalyzer';
import { CareerPathAI } from '@/components/CareerPathAI';
import {
  Briefcase,
  MapPin,
  TrendingUp,
  Sparkles,
  Upload,
  Zap,
  Target,
  Globe,
} from 'lucide-react';

const featuredJobs = [
  {
    id: '1',
    title: 'Senior Full-Stack Engineer',
    company: 'TechCorp India',
    location: 'Bangalore, Karnataka',
    salary: '₹18L - ₹28L',
    type: 'Full-time',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    matchScore: 95,
    posted: '2 hours ago',
    logo: '🏢',
  },
  {
    id: '2',
    title: 'AI/ML Engineer',
    company: 'DataVerse AI',
    location: 'Coimbatore, Tamil Nadu',
    salary: '₹15L - ₹25L',
    type: 'Full-time',
    skills: ['Python', 'TensorFlow', 'NLP', 'FastAPI'],
    matchScore: 88,
    posted: '5 hours ago',
    logo: '🤖',
  },
  {
    id: '3',
    title: 'DevOps Cloud Architect',
    company: 'CloudNine Solutions',
    location: 'Chennai, Tamil Nadu',
    salary: '₹20L - ₹35L',
    type: 'Remote',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    matchScore: 82,
    posted: '1 day ago',
    logo: '☁️',
  },
  {
    id: '4',
    title: 'Product Designer',
    company: 'DesignFlow Studio',
    location: 'Kochi, Kerala',
    salary: '₹12L - ₹20L',
    type: 'Hybrid',
    skills: ['Figma', 'UI/UX', 'Prototyping', 'Design Systems'],
    matchScore: 76,
    posted: '3 days ago',
    logo: '🎨',
  },
  {
    id: '5',
    title: 'Backend Engineer (Go)',
    company: 'FinEdge Technologies',
    location: 'Bangalore, Karnataka',
    salary: '₹16L - ₹30L',
    type: 'Full-time',
    skills: ['Go', 'gRPC', 'Redis', 'Microservices'],
    matchScore: 71,
    posted: '4 days ago',
    logo: '⚡',
  },
  {
    id: '6',
    title: 'Data Analyst',
    company: 'InsightPro Analytics',
    location: 'Coimbatore, Tamil Nadu',
    salary: '₹8L - ₹14L',
    type: 'Full-time',
    skills: ['SQL', 'Python', 'Tableau', 'Excel'],
    matchScore: 68,
    posted: '5 days ago',
    logo: '📊',
  },
];

const stats = [
  { label: 'Active Jobs', value: '12,450+', icon: Briefcase, color: 'text-neon-cyan' },
  { label: 'Locations', value: '85+', icon: MapPin, color: 'text-neon-green' },
  { label: 'AI Matches', value: '98.2%', icon: Target, color: 'text-neon-purple' },
  { label: 'Companies', value: '3,200+', icon: Globe, color: 'text-neon-pink' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function HomePage() {
  return (
    <div className="relative">
      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
            >
              <Sparkles className="w-4 h-4 text-neon-cyan" />
              <span className="text-sm text-neon-cyan font-medium">
                AI-Powered Career Intelligence
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 leading-tight">
              Find Your <span className="gradient-text">Dream Job</span>
              <br />
              With <span className="neon-text text-neon-cyan">AI Precision</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Upload your resume and let our AI engine match you with the perfect
              opportunities. Smart recommendations powered by NLP and embedding
              similarity scoring.
            </p>

            {/* AI-Powered Smart Search */}
            <SmartSearchBar />

            {/* Quick Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <button className="btn-neon flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Resume
              </button>
              <button className="btn-primary-gradient flex items-center gap-2">
                <Zap className="w-4 h-4" />
                AI Job Match
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={item}>
                <StatsPanel
                  label={stat.label}
                  value={stat.value}
                  icon={stat.icon}
                  color={stat.color}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== FILTER RIBBON ===== */}
      <FilterRibbon />

      {/* ===== AI INSIGHTS ===== */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <AIInsights />
        </div>
      </section>

      {/* ===== LOCATION HEATMAP + SKILL GAP ===== */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <LocationHeatmap />
            <SkillGapAnalyzer />
          </div>
        </div>
      </section>

      {/* ===== AI CAREER PATH ===== */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <CareerPathAI />
        </div>
      </section>

      {/* ===== FEATURED JOBS ===== */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading">
                <span className="gradient-text-cyan">AI-Recommended</span> Jobs
              </h2>
              <p className="text-muted-foreground mt-2">
                Personalized matches based on your profile and preferences
              </p>
            </div>
            <button className="btn-neon hidden md:flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              View All
            </button>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuredJobs.map((job) => (
              <motion.div key={job.id} variants={item}>
                <JobCard job={job} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 via-transparent to-neon-purple/5" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
                Ready to Find Your{' '}
                <span className="gradient-text">Perfect Match</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Upload your resume and let our AI analyze your skills, experience,
                and preferences to find the best opportunities near you.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="btn-primary-gradient text-lg px-8 py-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Get Started Free
                </button>
                <button className="btn-neon text-lg px-8 py-4">
                  Learn More
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
