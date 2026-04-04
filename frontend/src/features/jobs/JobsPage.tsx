'use client';

import { JobList } from './JobList';
import { JobFilters } from './JobFilters';

export function JobsPage() {
  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-72 shrink-0">
          <JobFilters />
        </aside>
        <main className="flex-1">
          <JobList />
        </main>
      </div>
    </div>
  );
}
