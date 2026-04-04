import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { LocationFilterService } from './location-filter.service';

@ApiTags('location')
@Controller('location')
export class LocationFilterController {
  constructor(private readonly locationFilterService: LocationFilterService) {}

  @Get('nearby-jobs')
  @ApiOperation({ summary: 'Find jobs near a location' })
  @ApiQuery({ name: 'lat', required: true })
  @ApiQuery({ name: 'lng', required: true })
  @ApiQuery({ name: 'radius', required: false, description: 'Radius in km' })
  async findNearbyJobs(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('radius') radius: number = 50,
  ) {
    return this.locationFilterService.findNearbyJobs(lat, lng, radius);
  }

  @Get('cities')
  @ApiOperation({ summary: 'Get supported cities' })
  async getSupportedCities() {
    return this.locationFilterService.getSupportedCities();
  }
}
