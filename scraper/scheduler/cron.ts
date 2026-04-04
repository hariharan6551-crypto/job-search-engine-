/**
 * Scraper Scheduler
 * Manages cron-based job scraping across all sources
 */

// import * as cron from 'node-cron';
import { IndeedScraper } from '../indeed/scraper';
import { LinkedInScraper } from '../linkedin/scraper';
import { NaukriScraper } from '../naukri/scraper';

export interface SchedulerConfig {
  schedule: string;       // Cron expression
  queries: string[];      // Search queries
  locations: string[];    // Target locations
  maxPagesPerSource: number;
}

const defaultConfig: SchedulerConfig = {
  schedule: '0 */6 * * *',  // Every 6 hours
  queries: ['react developer', 'python developer', 'full stack engineer', 'data analyst', 'devops engineer'],
  locations: ['Bangalore', 'Coimbatore', 'Chennai', 'Kochi', 'Hyderabad'],
  maxPagesPerSource: 5,
};

export class ScraperScheduler {
  private config: SchedulerConfig;
  private indeedScraper: IndeedScraper;
  private linkedInScraper: LinkedInScraper;
  private naukriScraper: NaukriScraper;
  private isRunning = false;

  constructor(config?: Partial<SchedulerConfig>) {
    this.config = { ...defaultConfig, ...config };
    this.indeedScraper = new IndeedScraper({ maxPages: this.config.maxPagesPerSource });
    this.linkedInScraper = new LinkedInScraper({ maxPages: this.config.maxPagesPerSource });
    this.naukriScraper = new NaukriScraper({ maxPages: this.config.maxPagesPerSource });
  }

  start() {
    console.log(`📅 Scheduler started: ${this.config.schedule}`);
    // cron.schedule(this.config.schedule, () => this.runAll());
  }

  async runAll() {
    if (this.isRunning) {
      console.log('⚠️ Scraping already in progress, skipping...');
      return;
    }

    this.isRunning = true;
    console.log('🚀 Starting scheduled scraping run...');
    const startTime = Date.now();

    try {
      for (const query of this.config.queries) {
        for (const location of this.config.locations) {
          await Promise.allSettled([
            this.indeedScraper.scrape(query, location),
            this.linkedInScraper.scrape(query, location),
            this.naukriScraper.scrape(query, location),
          ]);
        }
      }
    } catch (error) {
      console.error('❌ Scraping error:', error);
    } finally {
      this.isRunning = false;
      const duration = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`✅ Scraping run completed in ${duration}s`);
    }
  }
}

export default ScraperScheduler;
