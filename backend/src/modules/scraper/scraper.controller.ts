import { Controller, Post, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ScraperService } from './scraper.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('scraper')
@Controller('scraper')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Post('trigger')
  @ApiOperation({ summary: 'Manually trigger job scraping' })
  async triggerScraping() {
    return this.scraperService.triggerScraping();
  }

  @Get('status')
  @ApiOperation({ summary: 'Get scraper status' })
  async getStatus() {
    return this.scraperService.getStatus();
  }
}
