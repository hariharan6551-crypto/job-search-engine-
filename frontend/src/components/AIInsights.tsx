'use client';

import { motion } from 'framer-motion';
import { Brain, TrendingUp, MapPin, Sparkles } from 'lucide-react';

const insights = [
  {
    icon: Brain,
    title: 'Smart Resume Analysis',
    description: 'Our NLP engine extracts 50+ skill categories and matches them to job requirements in real-time.',
    stat: '94% accuracy',
    color: 'text-neon-cyan',
    gradient: 'from-neon-cyan/10 to-transparent',
  },
  {
    icon: TrendingUp,
    title: 'Trending Skills',
    description: 'React, TypeScript, and Python are the most demanded skills in your preferred locations this month.',
    stat: '+23% demand',
    color: 'text-neon-green',
    gradient: 'from-neon-green/10 to-transparent',
  },
  {
    icon: MapPin,
    title: 'Location Intelligence',
    description: 'Bangalore and Coimbatore lead in tech job openings with 3,400+ new positions this week.',
    stat: '85+ cities',
    color: 'text-neon-purple',
    gradient: 'from-neon-purple/10 to-transparent',
  },
];

export function AIInsights() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-heading">AI Insights</h2>
          <p className="text-sm text-muted-foreground">
            Powered by machine learning analysis
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, idx) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
            className="glass-card p-6 relative overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${insight.gradient} pointer-events-none`} />
            <div className="relative z-10">
              <insight.icon className={`w-8 h-8 ${insight.color} mb-4`} />
              <h3 className="font-semibold text-foreground mb-2">{insight.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {insight.description}
              </p>
              <span className={`text-sm font-bold ${insight.color}`}>{insight.stat}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
