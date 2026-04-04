'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Lock, User, Eye, EyeOff, Sparkles, ArrowRight, Briefcase, MapPin } from 'lucide-react';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', location: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold font-heading">Create your account</h1>
          <p className="text-sm text-muted-foreground mt-1">Start your AI-powered career journey</p>
        </div>

        {/* Form */}
        <div className="glass-card p-8">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Full Name</label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus-within:border-neon-cyan/30 transition-colors">
                <User className="w-4 h-4 text-muted-foreground" />
                <input type="text" value={form.name} onChange={(e) => updateField('name', e.target.value)}
                  placeholder="John Doe" className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground" required />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Email</label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus-within:border-neon-cyan/30 transition-colors">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <input type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)}
                  placeholder="you@example.com" className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground" required />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Password</label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus-within:border-neon-cyan/30 transition-colors">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => updateField('password', e.target.value)}
                  placeholder="Min. 8 characters" className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground" minLength={8} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Location (optional)</label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus-within:border-neon-cyan/30 transition-colors">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <input type="text" value={form.location} onChange={(e) => updateField('location', e.target.value)}
                  placeholder="Coimbatore, Tamil Nadu" className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground" />
              </div>
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full btn-primary-gradient py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50 mt-6">
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><Sparkles className="w-4 h-4" /> Create Account</>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-neon-cyan hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
