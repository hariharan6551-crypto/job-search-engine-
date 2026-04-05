'use client';

import { motion } from 'framer-motion';
import { MapPin, TrendingUp } from 'lucide-react';

interface CityData {
  name: string;
  state: string;
  jobs: number;
  growth: string;
  x: number; // percentage position on the map
  y: number;
  intensity: 'high' | 'medium' | 'low';
}

const cities: CityData[] = [
  { name: 'Bangalore', state: 'Karnataka', jobs: 5420, growth: '+18%', x: 48, y: 62, intensity: 'high' },
  { name: 'Chennai', state: 'Tamil Nadu', jobs: 2870, growth: '+12%', x: 55, y: 72, intensity: 'high' },
  { name: 'Coimbatore', state: 'Tamil Nadu', jobs: 1240, growth: '+25%', x: 47, y: 75, intensity: 'medium' },
  { name: 'Kochi', state: 'Kerala', jobs: 890, growth: '+15%', x: 44, y: 80, intensity: 'medium' },
  { name: 'Hyderabad', state: 'Telangana', jobs: 3200, growth: '+14%', x: 52, y: 50, intensity: 'high' },
  { name: 'Thiruvananthapuram', state: 'Kerala', jobs: 520, growth: '+8%', x: 44, y: 88, intensity: 'low' },
  { name: 'Madurai', state: 'Tamil Nadu', jobs: 380, growth: '+10%', x: 51, y: 82, intensity: 'low' },
  { name: 'Mysore', state: 'Karnataka', jobs: 340, growth: '+22%', x: 45, y: 66, intensity: 'low' },
];

function getIntensityStyles(intensity: string) {
  switch (intensity) {
    case 'high':
      return {
        dot: 'w-5 h-5 bg-neon-cyan shadow-[0_0_20px_rgba(0,245,255,0.6)]',
        pulse: 'w-10 h-10 bg-neon-cyan/20',
        ring: 'w-16 h-16 bg-neon-cyan/5',
      };
    case 'medium':
      return {
        dot: 'w-4 h-4 bg-neon-green shadow-[0_0_15px_rgba(57,255,20,0.5)]',
        pulse: 'w-8 h-8 bg-neon-green/20',
        ring: 'w-12 h-12 bg-neon-green/5',
      };
    default:
      return {
        dot: 'w-3 h-3 bg-neon-purple shadow-[0_0_10px_rgba(191,0,255,0.4)]',
        pulse: 'w-6 h-6 bg-neon-purple/20',
        ring: 'w-10 h-10 bg-neon-purple/5',
      };
  }
}

export function LocationHeatmap() {
  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-green to-neon-cyan flex items-center justify-center">
          <MapPin className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold font-heading">Job Density Heatmap</h3>
          <p className="text-sm text-muted-foreground">South India tech job concentration</p>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full aspect-[4/5] md:aspect-[3/4] rounded-xl bg-gradient-to-b from-white/[0.02] to-white/[0.005] border border-white/5 overflow-hidden">
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-30" />

        {/* State regions (simplified visual) */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid meet">
          {/* Karnataka */}
          <path d="M35,45 L55,42 L58,55 L55,68 L42,70 L35,60 Z" fill="rgba(0,245,255,0.03)" stroke="rgba(0,245,255,0.1)" strokeWidth="0.3" />
          {/* Tamil Nadu */}
          <path d="M42,70 L55,68 L60,72 L58,85 L48,90 L42,82 Z" fill="rgba(57,255,20,0.03)" stroke="rgba(57,255,20,0.1)" strokeWidth="0.3" />
          {/* Kerala */}
          <path d="M35,70 L42,70 L42,82 L48,90 L42,92 L35,85 Z" fill="rgba(191,0,255,0.03)" stroke="rgba(191,0,255,0.1)" strokeWidth="0.3" />
          {/* Telangana */}
          <path d="M40,38 L55,35 L58,42 L55,52 L42,50 L38,45 Z" fill="rgba(255,0,110,0.03)" stroke="rgba(255,0,110,0.1)" strokeWidth="0.3" />
        </svg>

        {/* City Dots */}
        {cities.map((city, idx) => {
          const styles = getIntensityStyles(city.intensity);
          return (
            <motion.div
              key={city.name}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1 + 0.3, duration: 0.4 }}
              className="absolute group"
              style={{ left: `${city.x}%`, top: `${city.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              {/* Pulsing rings */}
              <div className={`absolute rounded-full ${styles.ring} animate-ping`} style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', animationDuration: '3s' }} />
              <div className={`absolute rounded-full ${styles.pulse} animate-pulse`} style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />

              {/* Core dot */}
              <div className={`relative rounded-full ${styles.dot} cursor-pointer z-10`} />

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                <div className="glass-card px-3 py-2 rounded-lg whitespace-nowrap text-center">
                  <p className="text-xs font-bold text-foreground">{city.name}</p>
                  <p className="text-[10px] text-muted-foreground">{city.state}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold text-neon-cyan">{city.jobs.toLocaleString()} jobs</span>
                    <span className="text-[10px] text-neon-green flex items-center gap-0.5">
                      <TrendingUp className="w-2.5 h-2.5" />
                      {city.growth}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-neon-cyan shadow-[0_0_8px_rgba(0,245,255,0.5)]" />
          <span className="text-xs text-muted-foreground">High (2000+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-neon-green shadow-[0_0_6px_rgba(57,255,20,0.4)]" />
          <span className="text-xs text-muted-foreground">Medium (500+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neon-purple shadow-[0_0_6px_rgba(191,0,255,0.4)]" />
          <span className="text-xs text-muted-foreground">Growing</span>
        </div>
      </div>
    </div>
  );
}
