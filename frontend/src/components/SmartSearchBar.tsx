'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Sparkles, TrendingUp, Clock, X } from 'lucide-react';
import { useDebounce } from '@/hooks/useJobs';

interface Suggestion {
  type: 'job_title' | 'skill' | 'company' | 'recent';
  text: string;
  subtitle?: string;
}

const trendingSuggestions: Suggestion[] = [
  { type: 'job_title', text: 'Full-Stack Developer', subtitle: '2,340 openings' },
  { type: 'skill', text: 'React + TypeScript', subtitle: 'Trending skill combo' },
  { type: 'job_title', text: 'AI/ML Engineer', subtitle: '1,890 openings' },
  { type: 'company', text: 'Google', subtitle: '45 new positions' },
  { type: 'job_title', text: 'DevOps Engineer', subtitle: '980 openings' },
  { type: 'skill', text: 'Python + FastAPI', subtitle: 'High demand' },
];

const recentSearches: Suggestion[] = [
  { type: 'recent', text: 'React developer Coimbatore' },
  { type: 'recent', text: 'Python ML engineer remote' },
];

const autocompleteSuggestions: Record<string, Suggestion[]> = {
  react: [
    { type: 'job_title', text: 'React Developer', subtitle: '1,200+ jobs' },
    { type: 'job_title', text: 'React Native Developer', subtitle: '580 jobs' },
    { type: 'job_title', text: 'Senior React Engineer', subtitle: '340 jobs' },
    { type: 'skill', text: 'React + Node.js', subtitle: 'Popular stack' },
  ],
  python: [
    { type: 'job_title', text: 'Python Developer', subtitle: '2,100+ jobs' },
    { type: 'job_title', text: 'Python Data Scientist', subtitle: '890 jobs' },
    { type: 'job_title', text: 'Python ML Engineer', subtitle: '670 jobs' },
    { type: 'skill', text: 'Python + Django', subtitle: 'Backend stack' },
  ],
  full: [
    { type: 'job_title', text: 'Full-Stack Developer', subtitle: '2,340+ jobs' },
    { type: 'job_title', text: 'Full-Stack Engineer (MERN)', subtitle: '1,100 jobs' },
    { type: 'job_title', text: 'Full-Stack Architect', subtitle: '210 jobs' },
  ],
  data: [
    { type: 'job_title', text: 'Data Analyst', subtitle: '1,560 jobs' },
    { type: 'job_title', text: 'Data Engineer', subtitle: '980 jobs' },
    { type: 'job_title', text: 'Data Scientist', subtitle: '870 jobs' },
  ],
  dev: [
    { type: 'job_title', text: 'DevOps Engineer', subtitle: '980 jobs' },
    { type: 'job_title', text: 'Developer Advocate', subtitle: '120 jobs' },
  ],
};

function getIcon(type: string) {
  switch (type) {
    case 'job_title': return <TrendingUp className="w-4 h-4 text-neon-cyan" />;
    case 'skill': return <Sparkles className="w-4 h-4 text-neon-purple" />;
    case 'company': return <Search className="w-4 h-4 text-neon-green" />;
    case 'recent': return <Clock className="w-4 h-4 text-muted-foreground" />;
    default: return <Search className="w-4 h-4 text-muted-foreground" />;
  }
}

export function SmartSearchBar() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const debouncedQuery = useDebounce(query, 200);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSuggestions([...recentSearches, ...trendingSuggestions]);
      return;
    }

    const key = debouncedQuery.toLowerCase().split(' ')[0];
    const matched = autocompleteSuggestions[key];
    if (matched) {
      setSuggestions(matched);
    } else {
      // Fuzzy match across all suggestions
      const all = Object.values(autocompleteSuggestions).flat();
      const filtered = all.filter((s) =>
        s.text.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setSuggestions(filtered.length > 0 ? filtered : trendingSuggestions.slice(0, 3));
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (suggestion: Suggestion) => {
    setQuery(suggestion.text);
    setIsFocused(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFocused(false);
    console.log('AI Search:', { query, location });
  };

  return (
    <div ref={containerRef} className="w-full max-w-3xl mx-auto relative">
      <motion.form
        onSubmit={handleSearch}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div
          className={`glass-card p-2 flex flex-col md:flex-row gap-2 transition-all duration-300 ${
            isFocused ? 'neon-border ring-2 ring-neon-cyan/20' : ''
          }`}
        >
          {/* AI-Powered Search Input */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 relative">
            <Sparkles className="w-5 h-5 text-neon-cyan shrink-0 animate-pulse-neon" />
            <input
              type="text"
              placeholder="AI Search — Job title, skills, or company..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm"
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Location Input */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 md:w-64">
            <MapPin className="w-5 h-5 text-neon-green shrink-0" />
            <input
              type="text"
              placeholder="City, state, or pincode..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="btn-primary-gradient px-6 py-3 rounded-lg flex items-center gap-2 text-sm font-semibold whitespace-nowrap"
          >
            <Search className="w-4 h-4" />
            AI Search
          </button>
        </div>
      </motion.form>

      {/* Autocomplete Dropdown */}
      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -5, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -5, scaleY: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 top-full left-0 right-0 mt-2 glass-card p-2 max-h-80 overflow-y-auto origin-top"
          >
            {!query.trim() && recentSearches.length > 0 && (
              <div className="px-3 py-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Recent Searches
                </span>
              </div>
            )}
            {!query.trim() && recentSearches.map((s, i) => (
              <button
                key={`recent-${i}`}
                onClick={() => handleSelect(s)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-left group"
              >
                {getIcon(s.type)}
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {s.text}
                </span>
              </button>
            ))}

            {!query.trim() && (
              <div className="px-3 py-2 mt-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Trending Now
                </span>
              </div>
            )}

            {(query.trim() ? suggestions : trendingSuggestions).map((s, i) => (
              <button
                key={`${s.type}-${i}`}
                onClick={() => handleSelect(s)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-left group"
              >
                {getIcon(s.type)}
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-foreground group-hover:text-neon-cyan transition-colors">
                    {s.text}
                  </span>
                  {s.subtitle && (
                    <span className="text-xs text-muted-foreground ml-2">
                      {s.subtitle}
                    </span>
                  )}
                </div>
              </button>
            ))}

            {query.trim() && (
              <div className="px-3 py-2 mt-1 border-t border-white/5">
                <button
                  onClick={handleSearch}
                  className="flex items-center gap-2 text-xs text-neon-cyan hover:underline"
                >
                  <Sparkles className="w-3 h-3" />
                  AI-powered search for &quot;{query}&quot;
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
