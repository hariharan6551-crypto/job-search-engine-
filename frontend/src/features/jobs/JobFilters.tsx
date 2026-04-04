'use client';

import { useState } from 'react';
import { MapPin, DollarSign, Briefcase, Filter } from 'lucide-react';

const locations = ['All Locations', 'Bangalore', 'Coimbatore', 'Chennai', 'Kochi', 'Hyderabad', 'Remote'];
const jobTypes = ['All Types', 'Full-time', 'Part-time', 'Contract', 'Remote', 'Hybrid'];
const salaryRanges = ['Any Salary', '₹5L - ₹10L', '₹10L - ₹20L', '₹20L - ₹35L', '₹35L+'];

export function JobFilters() {
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedSalary, setSelectedSalary] = useState('Any Salary');

  return (
    <div className="glass-card p-6 space-y-6 sticky top-24">
      <div className="flex items-center gap-2 mb-2">
        <Filter className="w-5 h-5 text-neon-cyan" />
        <h3 className="font-semibold font-heading text-lg">Filters</h3>
      </div>

      {/* Location Filter */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
          <MapPin className="w-4 h-4 text-neon-green" />
          Location
        </label>
        <div className="space-y-1.5">
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => setSelectedLocation(loc)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                selectedLocation === loc
                  ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20'
                  : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      {/* Job Type Filter */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
          <Briefcase className="w-4 h-4 text-neon-purple" />
          Job Type
        </label>
        <div className="space-y-1.5">
          {jobTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                selectedType === type
                  ? 'bg-neon-purple/10 text-neon-purple border border-neon-purple/20'
                  : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Salary Filter */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
          <DollarSign className="w-4 h-4 text-neon-green" />
          Salary Range
        </label>
        <div className="space-y-1.5">
          {salaryRanges.map((range) => (
            <button
              key={range}
              onClick={() => setSelectedSalary(range)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                selectedSalary === range
                  ? 'bg-neon-green/10 text-neon-green border border-neon-green/20'
                  : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button className="w-full btn-neon text-sm py-2.5">Reset Filters</button>
    </div>
  );
}
