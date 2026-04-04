import { Module } from '@nestjs/common';
import { AiRecommendationController } from './ai-recommendation.controller';
import { AiRecommendationService } from './ai-recommendation.service';

@Module({
  controllers: [AiRecommendationController],
  providers: [AiRecommendationService],
  exports: [AiRecommendationService],
})
export class AiRecommendationModule {}
