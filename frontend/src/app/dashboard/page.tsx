'use client';

import { useState, useEffect } from 'react';

import { motion } from 'framer-motion';
import {
  BarChart3,
  Briefcase,
  TrendingUp,
  Target,
  Zap,
  MapPin,
  FileText,
  Eye,
  ArrowUpRight,
  Sparkles,
  Clock,
  CheckCircle,
  BellRing,
  Send,
  XCircle,
  Calendar,
  Upload
} from 'lucide-react';
import { SkillGapAnalyzer } from '@/components/SkillGapAnalyzer';
import { CareerPathAI } from '@/components/CareerPathAI';
import { LocationHeatmap } from '@/components/LocationHeatmap';

// Dashboard metrics
const metrics = [
  { label: 'Profile Match Score', value: '87%', change: '+5%', icon: Target, color: 'from-neon-cyan to-cyan-400' },
  { label: 'Jobs Applied', value: '24', change: '+3 this week', icon: Briefcase, color: 'from-neon-green to-green-400' },
  { label: 'Profile Views', value: '156', change: '+18%', icon: Eye, color: 'from-neon-purple to-purple-400' },
  { label: 'Interview Calls', value: '8', change: '+2 new', icon: Zap, color: 'from-neon-pink to-pink-400' },
];

const smartAlerts = [
  { type: 'job', text: '5 New Data Analyst jobs in Coimbatore', time: 'Just now', priority: 'high' },
  { type: 'skill', text: 'Python is trending in 80% of your matches', time: '2 hours ago', priority: 'medium' },
  { type: 'salary', text: 'Salaries for React roles increased by 15%', time: '1 day ago', priority: 'low' },
];

const applicationTracker = [
  { role: 'Senior Full-Stack Engineer', company: 'TechCorp India', status: 'Interview', date: 'Oct 12', type: 'positive' },
  { role: 'AI/ML Engineer', company: 'DataVerse AI', status: 'Pending', date: 'Oct 14', type: 'pending' },
  { role: 'Python Developer', company: 'PyWorks Studio', status: 'Rejected', date: 'Oct 10', type: 'negative' },
];

const topMatches = [
  { title: 'Senior Full-Stack Engineer', company: 'TechCorp India', score: 95, location: 'Bangalore', salary: '₹18L-₹28L' },
  { title: 'AI/ML Engineer', company: 'DataVerse AI', score: 88, location: 'Coimbatore', salary: '₹15L-₹25L' },
  { title: 'DevOps Cloud Architect', company: 'CloudNine', score: 85, location: 'Chennai (Remote)', salary: '₹20L-₹35L' },
];

function getAlertIcon(type: string) {
  switch (type) {
    case 'job': return <Briefcase className="w-4 h-4 text-neon-cyan" />;
    case 'skill': return <Zap className="w-4 h-4 text-neon-purple" />;
    case 'salary': return <TrendingUp className="w-4 h-4 text-neon-green" />;
    default: return <BellRing className="w-4 h-4 text-yellow-400" />;
  }
}

function getAppStatusIcon(type: string) {
  switch (type) {
    case 'positive': return <CheckCircle className="w-4 h-4 text-neon-green" />;
    case 'pending': return <Send className="w-4 h-4 text-neon-cyan" />;
    case 'negative': return <XCircle className="w-4 h-4 text-red-500" />;
    default: return <Clock className="w-4 h-4 text-yellow-400" />;
  }
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
} as const;

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
} as const;

export default function DashboardPage() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate dashboard heavy fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const completeOnboarding = () => {
    setShowOnboarding(false);
  };

  return (
    <div className="min-h-screen pt-20 pb-16 relative">
      {/* Onboarding Modal Overlay */}
      {showOnboarding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 max-w-md w-full relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink" />
            <h2 className="text-2xl font-bold font-heading mb-2">Welcome to AI Career Engine</h2>
            <p className="text-sm text-muted-foreground mb-6">Let's aggressively tune your job feed. Select your priority regions.</p>
            
            <div className="space-y-3 mb-8">
              {['Tamil Nadu', 'Coimbatore', 'Bangalore', 'Kerala'].map((loc) => (
                <button
                  key={loc}
                  onClick={() => setSelectedLocations(prev => 
                    prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
                  )}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                    selectedLocations.includes(loc)
                      ? 'bg-neon-cyan/10 border-neon-cyan/50 text-neon-cyan'
                      : 'bg-white/5 border-white/10 hover:border-white/30 text-foreground'
                  }`}
                >
                  <span className="font-semibold text-sm">{loc}</span>
                  {selectedLocations.includes(loc) && <CheckCircle className="w-4 h-4" />}
                </button>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6 text-center">
              <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-semibold">Upload Resume (Optional)</p>
              <p className="text-xs text-muted-foreground mt-1">To unlock AI predictive analytics</p>
            </div>

            <button
              onClick={completeOnboarding}
              disabled={selectedLocations.length === 0}
              className={`w-full py-3 rounded-lg font-bold transition-all ${
                selectedLocations.length > 0 
                  ? 'btn-primary-gradient text-white' 
                  : 'bg-white/10 text-muted-foreground cursor-not-allowed'
              }`}
            >
              {selectedLocations.length > 0 ? 'Initialize Dashboard' : 'Select a location'}
            </button>
          </motion.div>
        </div>
      )}

      {/* Main Dashboard - blurred if onboarding */}
      <div className={`container mx-auto px-6 transition-all duration-500 ${showOnboarding ? 'opacity-30 blur-sm' : ''}`}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold font-heading">
            <span className="text-gradient">AI Dashboard</span>
          </h1>
          <p className="text-muted-foreground mt-2">Your personalized career intelligence hub</p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.label}
              variants={item}
              className="glass-card p-5 group hover:neon-border transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center shadow-lg`}>
                  <metric.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs text-neon-green font-medium flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" />
                  {metric.change}
                </span>
              </div>
              <p className="text-2xl font-bold font-heading">{metric.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{metric.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Top AI Matches */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 glass-card p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-neon-cyan" />
                <h2 className="text-lg font-semibold font-heading">Daily AI Job Picks</h2>
              </div>
              <span className="text-xs px-2 py-1 bg-neon-cyan/10 text-neon-cyan rounded flex items-center gap-1">
                Refreshed <Clock className="w-3 h-3" />
              </span>
            </div>
            
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 animate-pulse">
                    <div className="w-12 h-12 rounded-full bg-white/10 shrink-0" />
                    <div className="flex-1 space-y-2">
                       <div className="h-4 bg-white/10 rounded w-1/2" />
                       <div className="h-3 bg-white/10 rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : topMatches.length === 0 ? (
              <div className="text-center py-10">
                <Briefcase className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">No matches found for your current profile.</p>
                <button className="text-neon-cyan text-sm mt-3 underline">Update your resume</button>
              </div>
            ) : (
              <div className="space-y-3">
                {topMatches.map((job, idx) => (
                <motion.div
                  key={job.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-colors cursor-pointer group"
                >
                  {/* Match Score */}
                  <div className="relative w-12 h-12 shrink-0">
                    <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="15" fill="none"
                        stroke={job.score >= 90 ? '#00f5ff' : job.score >= 80 ? '#39ff14' : '#bf00ff'}
                        strokeWidth="3"
                        strokeDasharray={`${(job.score / 100) * 94.2} 94.2`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                      {job.score}%
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold group-hover:text-neon-cyan transition-colors truncate">
                      {job.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{job.company}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-neon-green">{job.salary}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {job.location}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            )}
          </motion.div>

          {/* Smart Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6 flex flex-col gap-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <BellRing className="w-5 h-5 text-neon-purple" />
                <h2 className="text-lg font-semibold font-heading">Smart Alerts</h2>
              </div>
              <div className="space-y-4">
                {smartAlerts.map((alert, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.08 }}
                    className="flex gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="mt-0.5 shrink-0">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-foreground font-medium">{alert.text}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Application Tracker */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Send className="w-5 h-5 text-neon-cyan" />
                <h2 className="text-lg font-semibold font-heading">Application Tracker</h2>
              </div>
              <div className="space-y-4">
                {applicationTracker.map((app, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + idx * 0.08 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">
                        {getAppStatusIcon(app.type)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold truncate">{app.role}</p>
                        <p className="text-[10px] text-muted-foreground">{app.company}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`text-[10px] font-bold uppercase ${
                        app.type === 'positive' ? 'text-neon-green' : app.type === 'negative' ? 'text-red-500' : 'text-neon-cyan'
                      }`}>
                        {app.status}
                      </span>
                      <p className="text-[10px] text-muted-foreground flex items-center gap-1 justify-end mt-1">
                        <Calendar className="w-3 h-3" /> {app.date}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Salary Prediction Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-6 md:p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading">AI Salary Prediction</h3>
              <p className="text-sm text-muted-foreground">Based on your profile analysis</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-neon-cyan/5 to-neon-cyan/10 border border-neon-cyan/10 text-center">
              <p className="text-xs text-muted-foreground mb-1">Predicted Range</p>
              <p className="text-xl font-bold text-neon-cyan">₹15L - ₹24L</p>
              <p className="text-[10px] text-muted-foreground mt-1">Annual CTC</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
              <p className="text-xs text-muted-foreground mb-1">Base Salary</p>
              <p className="text-xl font-bold">₹12L - ₹18L</p>
              <p className="text-[10px] text-muted-foreground mt-1">70% of CTC</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
              <p className="text-xs text-muted-foreground mb-1">Market Percentile</p>
              <p className="text-xl font-bold text-neon-green">72nd</p>
              <p className="text-[10px] text-muted-foreground mt-1">Above average</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
              <p className="text-xs text-muted-foreground mb-1">Growth Potential</p>
              <p className="text-xl font-bold text-neon-purple">+35%</p>
              <p className="text-[10px] text-muted-foreground mt-1">With skill upgrades</p>
            </div>
          </div>
        </motion.div>

        {/* Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SkillGapAnalyzer />
          <LocationHeatmap />
        </div>

        {/* Career Path */}
        <CareerPathAI />
      </div>
    </div>
  );
}
