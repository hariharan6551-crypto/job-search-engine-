import { Injectable, OnModuleInit } from '@nestjs/common';
import * as cron from 'node-cron';

@Injectable()
export class ScraperService implements OnModuleInit {
  private isRunning = false;
  private lastRun: Date | null = null;
  private jobsScraped = 0;

  onModuleInit() {
    // Schedule scraping every 6 hours
    const schedule = process.env.SCRAPER_CRON_SCHEDULE || '0 */6 * * *';
    cron.schedule(schedule, () => {
      this.triggerScraping();
    });
    console.log(`🕷 Scraper scheduled: ${schedule}`);
  }

  async triggerScraping() {
    if (this.isRunning) {
      return { message: 'Scraping already in progress', status: 'running' };
    }

    this.isRunning = true;
    console.log('🕷 Starting job scraping...');

    try {
      // Scrape from multiple sources
      const results = await Promise.allSettled([
        this.scrapeIndeed(),
        this.scrapeLinkedIn(),
        this.scrapeNaukri(),
      ]);

      const totalJobs = results
        .filter((r) => r.status === 'fulfilled')
        .reduce((sum, r: any) => sum + (r.value?.count || 0), 0);

      this.jobsScraped += totalJobs;
      this.lastRun = new Date();
      this.isRunning = false;

      return {
        message: 'Scraping completed',
        totalJobsScraped: totalJobs,
        timestamp: this.lastRun,
      };
    } catch (error) {
      this.isRunning = false;
      throw error;
    }
  }

  async getStatus() {
    return {
      isRunning: this.isRunning,
      lastRun: this.lastRun,
      totalJobsScraped: this.jobsScraped,
      sources: ['Indeed', 'LinkedIn', 'Naukri'],
      schedule: process.env.SCRAPER_CRON_SCHEDULE || '0 */6 * * *',
    };
  }

  private async scrapeIndeed(): Promise<{ count: number }> {
    // TODO: Implement Indeed scraping with Playwright
    console.log('  → Scraping Indeed...');
    return { count: 0 };
  }

  private async scrapeLinkedIn(): Promise<{ count: number }> {
    // TODO: Implement LinkedIn scraping with Playwright
    console.log('  → Scraping LinkedIn...');
    return { count: 0 };
  }

  private async scrapeNaukri(): Promise<{ count: number }> {
    // TODO: Implement Naukri scraping with Playwright
    console.log('  → Scraping Naukri...');
    return { count: 0 };
  }
}
