import { Module } from '@nestjs/common';
import { LocationFilterController } from './location-filter.controller';
import { LocationFilterService } from './location-filter.service';

@Module({
  controllers: [LocationFilterController],
  providers: [LocationFilterService],
  exports: [LocationFilterService],
})
export class LocationFilterModule {}
