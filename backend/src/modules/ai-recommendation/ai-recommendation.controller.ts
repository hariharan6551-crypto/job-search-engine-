import { Controller, Get, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AiRecommendationService } from './ai-recommendation.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('recommendations')
@Controller('recommendations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AiRecommendationController {
  constructor(private readonly aiRecommendationService: AiRecommendationService) {}

  @Get()
  @ApiOperation({ summary: 'Get AI-powered job recommendations' })
  async getRecommendations(
    @Request() req: any,
    @Query('limit') limit: number = 10,
  ) {
    return this.aiRecommendationService.getRecommendations(req.user.id, limit);
  }

  @Get('trending')
  @ApiOperation({ summary: 'Get trending jobs and skills' })
  async getTrending() {
    return this.aiRecommendationService.getTrendingSkills();
  }
}
