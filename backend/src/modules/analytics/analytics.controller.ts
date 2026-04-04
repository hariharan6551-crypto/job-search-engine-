import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('platform-stats')
  @ApiOperation({ summary: 'Get platform-wide statistics' })
  async getPlatformStats() {
    return this.analyticsService.getPlatformStats();
  }

  @Get('trending-skills')
  @ApiOperation({ summary: 'Get trending skills with demand data' })
  async getTrendingSkills() {
    return this.analyticsService.getTrendingSkills();
  }

  @Get('job-market')
  @ApiOperation({ summary: 'Get job market analytics by location and type' })
  @ApiQuery({ name: 'location', required: false })
  @ApiQuery({ name: 'period', required: false, description: '7d, 30d, 90d' })
  async getJobMarket(
    @Query('location') location?: string,
    @Query('period') period?: string,
  ) {
    return this.analyticsService.getJobMarketAnalytics(location, period);
  }

  @Get('user-insights')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get personalized user analytics' })
  async getUserInsights() {
    return this.analyticsService.getUserInsights();
  }

  @Get('salary-trends')
  @ApiOperation({ summary: 'Get salary trends by role and location' })
  @ApiQuery({ name: 'role', required: false })
  @ApiQuery({ name: 'location', required: false })
  async getSalaryTrends(
    @Query('role') role?: string,
    @Query('location') location?: string,
  ) {
    return this.analyticsService.getSalaryTrends(role, location);
  }
}
