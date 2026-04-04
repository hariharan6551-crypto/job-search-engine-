'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search:', { query, location });
  };

  return (
    <motion.form
      onSubmit={handleSearch}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="glass-card p-2 flex flex-col md:flex-row gap-2">
        {/* Job Title Input */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5">
          <Search className="w-5 h-5 text-neon-cyan shrink-0" />
          <input
            type="text"
            placeholder="Job title, skills, or company..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm"
          />
        </div>

        {/* Location Input */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 md:w-64">
          <MapPin className="w-5 h-5 text-neon-green shrink-0" />
          <input
            type="text"
            placeholder="City or region..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            type="button"
            className="p-3 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
          <button
            type="submit"
            className="btn-primary-gradient px-6 py-3 rounded-lg flex items-center gap-2 text-sm font-semibold whitespace-nowrap"
          >
            <Search className="w-4 h-4" />
            Search Jobs
          </button>
        </div>
      </div>
    </motion.form>
  );
}
