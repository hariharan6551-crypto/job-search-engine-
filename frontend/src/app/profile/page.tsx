'use client';

import { motion } from 'framer-motion';
import {
  User, MapPin, Mail, Phone, Briefcase, Star, Edit3,
  FileText, Settings, Shield, Sparkles, TrendingUp,
} from 'lucide-react';

const userProfile = {
  name: 'Hari Shankar',
  email: 'hari@example.com',
  phone: '+91 98765 43210',
  location: 'Coimbatore, Tamil Nadu',
  role: 'Full-Stack Developer',
  experience: '4 years',
  avatar: null,
  skills: ['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'Git', 'REST API'],
  resumeScore: 82,
  matchScore: 87,
  appliedCount: 24,
  savedCount: 12,
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 md:p-8 mb-6"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-3xl font-bold text-white">
                {userProfile.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold font-heading">{userProfile.name}</h1>
              <p className="text-neon-cyan font-medium">{userProfile.role}</p>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground justify-center md:justify-start">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{userProfile.location}</span>
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{userProfile.email}</span>
                <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{userProfile.experience}</span>
              </div>
            </div>

            {/* Edit */}
            <button className="btn-primary-gradient px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
              <Edit3 className="w-4 h-4" /> Edit Profile
            </button>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        >
          {[
            { label: 'Match Score', value: `${userProfile.matchScore}%`, icon: Sparkles, color: 'text-neon-cyan' },
            { label: 'Resume Score', value: `${userProfile.resumeScore}/100`, icon: FileText, color: 'text-neon-green' },
            { label: 'Applied', value: userProfile.appliedCount, icon: Briefcase, color: 'text-neon-purple' },
            { label: 'Saved Jobs', value: userProfile.savedCount, icon: Star, color: 'text-yellow-400' },
          ].map((stat, idx) => (
            <div key={stat.label} className="glass-card p-4 text-center">
              <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-[11px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-neon-cyan" /> Skills
            </h2>
            <button className="text-xs text-neon-cyan hover:underline flex items-center gap-1">
              <Edit3 className="w-3 h-3" /> Edit
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {userProfile.skills.map((skill) => (
              <span key={skill} className="px-3 py-1.5 rounded-full text-sm font-medium bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { icon: FileText, title: 'Upload Resume', desc: 'Update your resume for better matching', href: '/resume', color: 'from-neon-cyan to-cyan-400' },
            { icon: Settings, title: 'Preferences', desc: 'Set job alerts and notification preferences', href: '#', color: 'from-neon-purple to-purple-400' },
            { icon: Shield, title: 'Privacy', desc: 'Manage profile visibility and data', href: '#', color: 'from-neon-green to-green-400' },
          ].map((action) => (
            <a key={action.title} href={action.href}
              className="glass-card p-5 hover:neon-border transition-all duration-300 cursor-pointer group">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold group-hover:text-neon-cyan transition-colors">{action.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{action.desc}</p>
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
