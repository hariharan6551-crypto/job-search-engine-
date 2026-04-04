'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, FileText, CheckCircle, AlertTriangle, Sparkles,
  TrendingUp, Zap, ArrowRight, RefreshCcw, Download,
} from 'lucide-react';

type AnalysisState = 'idle' | 'uploading' | 'analyzing' | 'complete';

interface ResumeAnalysis {
  skills: string[];
  experience: string;
  education: string;
  score: number;
  atsScore: number;
  improvements: string[];
  keywordsMissing: string[];
  strengths: string[];
}

const mockAnalysis: ResumeAnalysis = {
  skills: ['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'Git', 'REST API'],
  experience: '4 years of professional experience in full-stack development',
  education: 'B.Tech in Computer Science — Anna University',
  score: 82,
  atsScore: 71,
  improvements: [
    'Add quantifiable metrics to achievements (e.g., "Improved load time by 40%")',
    'Include a professional summary at the top (2-3 lines)',
    'Add relevant certifications section (AWS, Docker, etc.)',
    'Use more action verbs: Led, Architected, Optimized, Delivered',
    'Move Skills section above Experience for better ATS scanning',
  ],
  keywordsMissing: ['Microservices', 'CI/CD', 'Agile', 'System Design', 'Kubernetes', 'AWS'],
  strengths: [
    'Strong technical skills section',
    'Good project descriptions with tech stack',
    'Clear education history',
    'Relevant work experience',
  ],
};

export default function ResumePage() {
  const [state, setState] = useState<AnalysisState>('idle');
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [fileName, setFileName] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = useCallback((file: File) => {
    setFileName(file.name);
    setState('uploading');

    setTimeout(() => {
      setState('analyzing');
      setTimeout(() => {
        setAnalysis(mockAnalysis);
        setState('complete');
      }, 2000);
    }, 1500);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const reset = () => {
    setState('idle');
    setAnalysis(null);
    setFileName('');
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold font-heading">
            <span className="text-gradient">AI Resume Analyzer</span>
          </h1>
          <p className="text-muted-foreground mt-2">Upload your resume for AI-powered analysis and ATS optimization</p>
        </motion.div>

        {/* Upload Area */}
        {state === 'idle' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`glass-card p-12 text-center cursor-pointer transition-all duration-300 ${
              dragActive ? 'neon-border bg-neon-cyan/5' : 'hover:border-white/20'
            }`}
          >
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileSelect} className="hidden" id="resume-upload" />
            <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 border border-white/10 flex items-center justify-center">
                <Upload className={`w-8 h-8 ${dragActive ? 'text-neon-cyan animate-bounce' : 'text-muted-foreground'}`} />
              </div>
              <div>
                <p className="text-lg font-semibold">
                  {dragActive ? 'Drop your resume here' : 'Upload your resume'}
                </p>
                <p className="text-sm text-muted-foreground mt-1">PDF, DOC, or DOCX · Max 10MB</p>
              </div>
              <div className="btn-primary-gradient px-6 py-3 rounded-lg text-sm font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4" /> Choose File
              </div>
            </label>
          </motion.div>
        )}

        {/* Processing Animation */}
        <AnimatePresence>
          {(state === 'uploading' || state === 'analyzing') && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass-card p-12 text-center">
              <div className="flex flex-col items-center gap-5">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-purple animate-spin-slow opacity-20" />
                  <div className="absolute inset-2 rounded-xl bg-background flex items-center justify-center">
                    {state === 'uploading' ? (
                      <Upload className="w-8 h-8 text-neon-cyan animate-pulse" />
                    ) : (
                      <Sparkles className="w-8 h-8 text-neon-cyan animate-pulse" />
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-lg font-semibold">
                    {state === 'uploading' ? 'Uploading...' : 'AI is analyzing your resume...'}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {state === 'uploading' ? `${fileName}` : 'Extracting skills, experience, and optimization opportunities'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Analysis Results */}
        {state === 'complete' && analysis && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Score Overview */}
            <div className="glass-card p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-neon-cyan" />
                  <span className="font-semibold">{fileName}</span>
                </div>
                <button onClick={reset} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-neon-cyan transition-colors">
                  <RefreshCcw className="w-3.5 h-3.5" /> Re-upload
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Resume Score */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-neon-cyan/5 to-neon-cyan/10 border border-neon-cyan/10 text-center">
                  <div className="relative w-20 h-20 mx-auto mb-3">
                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5" />
                      <circle cx="18" cy="18" r="15" fill="none" stroke="#00f5ff" strokeWidth="2.5" strokeDasharray={`${(analysis.score / 100) * 94.2} 94.2`} strokeLinecap="round" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-neon-cyan">
                      {analysis.score}
                    </span>
                  </div>
                  <p className="text-sm font-semibold">Resume Quality</p>
                  <p className="text-xs text-muted-foreground">out of 100</p>
                </div>

                {/* ATS Score */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-orange-400/5 to-yellow-400/10 border border-orange-400/10 text-center">
                  <div className="relative w-20 h-20 mx-auto mb-3">
                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5" />
                      <circle cx="18" cy="18" r="15" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray={`${(analysis.atsScore / 100) * 94.2} 94.2`} strokeLinecap="round" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-yellow-400">
                      {analysis.atsScore}
                    </span>
                  </div>
                  <p className="text-sm font-semibold">ATS Compatibility</p>
                  <p className="text-xs text-muted-foreground">Target: 85+</p>
                </div>

                {/* Skills Found */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-neon-green/5 to-neon-green/10 border border-neon-green/10 text-center">
                  <p className="text-4xl font-bold text-neon-green mb-3 pt-4">{analysis.skills.length}</p>
                  <p className="text-sm font-semibold">Skills Detected</p>
                  <p className="text-xs text-muted-foreground">{analysis.experience}</p>
                </div>
              </div>
            </div>

            {/* Extracted Skills */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-neon-cyan" /> Extracted Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysis.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 rounded-full text-sm font-medium bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* AI Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-400" /> AI Improvements
                </h3>
                <ul className="space-y-3">
                  {analysis.improvements.map((tip, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="text-orange-400 shrink-0 mt-0.5">→</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-neon-green" /> Strengths
                </h3>
                <ul className="space-y-3">
                  {analysis.strengths.map((str, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-neon-green shrink-0 mt-0.5" />
                      {str}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Missing Keywords */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-neon-purple" /> Missing ATS Keywords
              </h3>
              <p className="text-xs text-muted-foreground mb-3">Add these keywords to improve your ATS score by up to 20%</p>
              <div className="flex flex-wrap gap-2">
                {analysis.keywordsMissing.map((kw) => (
                  <span key={kw} className="px-3 py-1.5 rounded-full text-sm font-medium bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
