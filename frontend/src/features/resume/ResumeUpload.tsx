'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle, X, Loader2, Brain } from 'lucide-react';

export function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<null | {
    skills: string[];
    experience: string;
    education: string;
    score: number;
  }>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setAnalysisResult(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  const handleAnalyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    // Simulated AI analysis
    setTimeout(() => {
      setAnalysisResult({
        skills: ['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS'],
        experience: '4 years in Full-Stack Development',
        education: 'B.Tech in Computer Science',
        score: 87,
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Upload Zone */}
      <div
        {...getRootProps()}
        className={`glass-card p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragActive
            ? 'border-neon-cyan/50 bg-neon-cyan/5 neon-border'
            : 'hover:border-white/20'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 text-neon-cyan mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">
          {isDragActive ? 'Drop your resume here' : 'Upload Your Resume'}
        </h3>
        <p className="text-sm text-muted-foreground">
          Drag & drop or click to select — PDF, DOC, DOCX (max 10MB)
        </p>
      </div>

      {/* Selected File */}
      <AnimatePresence>
        {file && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card p-4 flex items-center gap-4"
          >
            <FileText className="w-8 h-8 text-neon-cyan shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setAnalysisResult(null);
              }}
              className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analyze Button */}
      {file && !analysisResult && (
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="w-full btn-primary-gradient py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              AI is analyzing your resume...
            </>
          ) : (
            <>
              <Brain className="w-5 h-5" />
              Analyze with AI
            </>
          )}
        </button>
      )}

      {/* Analysis Results */}
      <AnimatePresence>
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 space-y-5"
          >
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-neon-green" />
              <h3 className="font-semibold text-lg">Analysis Complete</h3>
              <div className="ml-auto px-3 py-1 rounded-full bg-neon-green/10 text-neon-green text-sm font-bold">
                {analysisResult.score}/100
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Extracted Skills</h4>
              <div className="flex flex-wrap gap-2">
                {analysisResult.skills.map((skill) => (
                  <span key={skill} className="skill-badge">{skill}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-xs text-muted-foreground mb-1">Experience</p>
                <p className="text-sm font-medium">{analysisResult.experience}</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-xs text-muted-foreground mb-1">Education</p>
                <p className="text-sm font-medium">{analysisResult.education}</p>
              </div>
            </div>

            <button className="w-full btn-neon py-2.5 flex items-center justify-center gap-2 text-sm">
              Find Matching Jobs →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
