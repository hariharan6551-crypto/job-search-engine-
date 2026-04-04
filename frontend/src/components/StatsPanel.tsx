'use client';

import { type LucideIcon } from 'lucide-react';

interface StatsPanelProps {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export function StatsPanel({ label, value, icon: Icon, color }: StatsPanelProps) {
  return (
    <div className="glass-card p-6 text-center group">
      <div className="flex justify-center mb-3">
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
      <p className="text-2xl md:text-3xl font-bold font-heading text-foreground mb-1">
        {value}
      </p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
