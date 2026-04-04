'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SlidersHorizontal,
  Briefcase,
  MapPin,
  DollarSign,
  Star,
  Building2,
  Layers,
  Wifi,
  X,
  ChevronDown,
} from 'lucide-react';

interface FilterState {
  jobType: string[];
  workMode: string[];
  location: { state: string; city: string; pincode: string };
  salaryRange: [number, number];
  experienceLevel: string;
  companyName: string;
  skills: string[];
}

const JOB_TYPES = [
  { value: 'full-time', label: 'Full-time', color: 'text-neon-cyan' },
  { value: 'part-time', label: 'Part-time', color: 'text-neon-green' },
  { value: 'internship-stipend', label: 'Internship (with stipend)', color: 'text-yellow-400' },
  { value: 'internship-no-stipend', label: 'Internship (without stipend)', color: 'text-orange-400' },
  { value: 'contract', label: 'Contract', color: 'text-neon-purple' },
  { value: 'freelance', label: 'Freelance', color: 'text-neon-pink' },
];

const WORK_MODES = [
  { value: 'remote', label: 'Remote', icon: '🌍' },
  { value: 'hybrid', label: 'Hybrid', icon: '🔄' },
  { value: 'onsite', label: 'Onsite', icon: '🏢' },
];

const EXPERIENCE_LEVELS = [
  'Fresher (0-1 yr)',
  'Junior (1-3 yrs)',
  'Mid-level (3-5 yrs)',
  'Senior (5-8 yrs)',
  'Lead (8-12 yrs)',
  'Principal (12+ yrs)',
];

const POPULAR_SKILLS = [
  'React', 'Python', 'TypeScript', 'Node.js', 'Java', 'AWS',
  'Docker', 'Kubernetes', 'Machine Learning', 'SQL', 'Go', 'Rust',
];

const STATES = [
  'Tamil Nadu', 'Karnataka', 'Kerala', 'Telangana', 'Maharashtra',
  'Delhi NCR', 'Gujarat', 'Rajasthan', 'West Bengal', 'All India',
];

const CITIES: Record<string, string[]> = {
  'Tamil Nadu': ['Coimbatore', 'Chennai', 'Madurai', 'Salem', 'Trichy'],
  'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore'],
  'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
};

type FilterSection = 'jobType' | 'workMode' | 'location' | 'salary' | 'experience' | 'skills' | null;

export function FilterRibbon() {
  const [filters, setFilters] = useState<FilterState>({
    jobType: [],
    workMode: [],
    location: { state: '', city: '', pincode: '' },
    salaryRange: [0, 5000000],
    experienceLevel: '',
    companyName: '',
    skills: [],
  });
  const [openSection, setOpenSection] = useState<FilterSection>(null);
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  const toggleSection = (section: FilterSection) => {
    setOpenSection(openSection === section ? null : section);
  };

  const toggleArrayFilter = (key: 'jobType' | 'workMode' | 'skills', value: string) => {
    setFilters((prev) => {
      const arr = prev[key];
      const updated = arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value];
      const newFilters = { ...prev, [key]: updated };
      updateActiveCount(newFilters);
      return newFilters;
    });
  };

  const updateActiveCount = (f: FilterState) => {
    let count = 0;
    count += f.jobType.length;
    count += f.workMode.length;
    count += f.skills.length;
    if (f.location.state) count++;
    if (f.location.city) count++;
    if (f.experienceLevel) count++;
    if (f.companyName) count++;
    if (f.salaryRange[0] > 0 || f.salaryRange[1] < 5000000) count++;
    setActiveFilterCount(count);
  };

  const clearAll = () => {
    setFilters({
      jobType: [],
      workMode: [],
      location: { state: '', city: '', pincode: '' },
      salaryRange: [0, 5000000],
      experienceLevel: '',
      companyName: '',
      skills: [],
    });
    setActiveFilterCount(0);
    setOpenSection(null);
  };

  const FilterButton = ({
    label,
    icon: Icon,
    section,
    count,
  }: {
    label: string;
    icon: any;
    section: FilterSection;
    count?: number;
  }) => (
    <button
      onClick={() => toggleSection(section)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
        openSection === section
          ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30'
          : count && count > 0
          ? 'bg-neon-purple/10 text-neon-purple border border-neon-purple/20'
          : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground border border-transparent'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
      {count && count > 0 ? (
        <span className="w-5 h-5 rounded-full bg-neon-purple/20 text-neon-purple text-xs flex items-center justify-center font-bold">
          {count}
        </span>
      ) : (
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openSection === section ? 'rotate-180' : ''}`} />
      )}
    </button>
  );

  return (
    <div className="sticky top-16 z-40 glass border-b border-white/5">
      <div className="container mx-auto px-6">
        {/* Filter Buttons Row */}
        <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 pr-3 border-r border-white/10">
            <SlidersHorizontal className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm font-semibold text-foreground whitespace-nowrap">Filters</span>
            {activeFilterCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-neon-cyan/10 text-neon-cyan text-xs font-bold">
                {activeFilterCount}
              </span>
            )}
          </div>

          <FilterButton label="Job Type" icon={Briefcase} section="jobType" count={filters.jobType.length} />
          <FilterButton label="Work Mode" icon={Wifi} section="workMode" count={filters.workMode.length} />
          <FilterButton label="Location" icon={MapPin} section="location" count={filters.location.state ? 1 : 0} />
          <FilterButton label="Salary" icon={DollarSign} section="salary" />
          <FilterButton label="Experience" icon={Star} section="experience" count={filters.experienceLevel ? 1 : 0} />
          <FilterButton label="Skills" icon={Layers} section="skills" count={filters.skills.length} />

          {/* Company search - inline */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-transparent focus-within:border-neon-cyan/30 focus-within:bg-neon-cyan/5 transition-all">
            <Building2 className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Company..."
              value={filters.companyName}
              onChange={(e) => {
                setFilters((p) => ({ ...p, companyName: e.target.value }));
                updateActiveCount({ ...filters, companyName: e.target.value });
              }}
              className="bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground w-28"
            />
          </div>

          {activeFilterCount > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-400/10 transition-colors whitespace-nowrap"
            >
              <X className="w-3.5 h-3.5" />
              Clear all
            </button>
          )}
        </div>

        {/* Expanded Filter Panel */}
        <AnimatePresence>
          {openSection && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-white/5"
            >
              <div className="py-4">
                {/* Job Type */}
                {openSection === 'jobType' && (
                  <div className="flex flex-wrap gap-2">
                    {JOB_TYPES.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => toggleArrayFilter('jobType', type.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          filters.jobType.includes(type.value)
                            ? `bg-neon-cyan/10 ${type.color} border border-neon-cyan/30`
                            : 'bg-white/5 text-muted-foreground hover:bg-white/10 border border-transparent'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Work Mode */}
                {openSection === 'workMode' && (
                  <div className="flex flex-wrap gap-3">
                    {WORK_MODES.map((mode) => (
                      <button
                        key={mode.value}
                        onClick={() => toggleArrayFilter('workMode', mode.value)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all ${
                          filters.workMode.includes(mode.value)
                            ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 neon-border'
                            : 'bg-white/5 text-muted-foreground hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        <span className="text-lg">{mode.icon}</span>
                        {mode.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Location */}
                {openSection === 'location' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-2 block">State</label>
                      <select
                        value={filters.location.state}
                        onChange={(e) => {
                          const newLoc = { ...filters.location, state: e.target.value, city: '' };
                          setFilters((p) => ({ ...p, location: newLoc }));
                          updateActiveCount({ ...filters, location: newLoc });
                        }}
                        className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm outline-none focus:border-neon-cyan/30 text-foreground"
                      >
                        <option value="">All States</option>
                        {STATES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-2 block">City</label>
                      <select
                        value={filters.location.city}
                        onChange={(e) => {
                          const newLoc = { ...filters.location, city: e.target.value };
                          setFilters((p) => ({ ...p, location: newLoc }));
                          updateActiveCount({ ...filters, location: newLoc });
                        }}
                        className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm outline-none focus:border-neon-cyan/30 text-foreground"
                        disabled={!filters.location.state}
                      >
                        <option value="">All Cities</option>
                        {(CITIES[filters.location.state] || []).map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-2 block">Pincode</label>
                      <input
                        type="text"
                        placeholder="e.g. 641001"
                        value={filters.location.pincode}
                        onChange={(e) => setFilters((p) => ({
                          ...p,
                          location: { ...p.location, pincode: e.target.value },
                        }))}
                        className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm outline-none focus:border-neon-cyan/30 text-foreground placeholder:text-muted-foreground"
                        maxLength={6}
                      />
                    </div>
                  </div>
                )}

                {/* Salary */}
                {openSection === 'salary' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Salary Range (Annual)</span>
                      <span className="text-sm font-semibold text-neon-cyan">
                        ₹{(filters.salaryRange[0] / 100000).toFixed(0)}L — ₹{(filters.salaryRange[1] / 100000).toFixed(0)}L
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="range"
                        min={0}
                        max={5000000}
                        step={100000}
                        value={filters.salaryRange[0]}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setFilters((p) => ({ ...p, salaryRange: [val, Math.max(val, p.salaryRange[1])] }));
                        }}
                        className="flex-1 accent-neon-cyan"
                      />
                      <input
                        type="range"
                        min={0}
                        max={5000000}
                        step={100000}
                        value={filters.salaryRange[1]}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setFilters((p) => ({ ...p, salaryRange: [Math.min(p.salaryRange[0], val), val] }));
                        }}
                        className="flex-1 accent-neon-purple"
                      />
                    </div>
                  </div>
                )}

                {/* Experience */}
                {openSection === 'experience' && (
                  <div className="flex flex-wrap gap-2">
                    {EXPERIENCE_LEVELS.map((level) => (
                      <button
                        key={level}
                        onClick={() => {
                          const val = filters.experienceLevel === level ? '' : level;
                          setFilters((p) => ({ ...p, experienceLevel: val }));
                          updateActiveCount({ ...filters, experienceLevel: val });
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          filters.experienceLevel === level
                            ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30'
                            : 'bg-white/5 text-muted-foreground hover:bg-white/10 border border-transparent'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                )}

                {/* Skills */}
                {openSection === 'skills' && (
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SKILLS.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => toggleArrayFilter('skills', skill)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                          filters.skills.includes(skill)
                            ? 'bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30'
                            : 'bg-white/5 text-muted-foreground hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
