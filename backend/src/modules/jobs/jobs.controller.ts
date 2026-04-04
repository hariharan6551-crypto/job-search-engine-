import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all jobs with optional filters' })
  @ApiQuery({ name: 'location', required: false })
  @ApiQuery({ name: 'type', required: false })
  @ApiQuery({ name: 'skills', required: false })
  @ApiQuery({ name: 'salaryMin', required: false })
  @ApiQuery({ name: 'salaryMax', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'sortBy', required: false })
  async findAll(
    @Query('location') location?: string,
    @Query('type') type?: string,
    @Query('skills') skills?: string,
    @Query('salaryMin') salaryMin?: number,
    @Query('salaryMax') salaryMax?: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Query('sortBy') sortBy: string = 'postedAt',
  ) {
    return this.jobsService.findAll({
      location,
      type,
      skills: skills ? skills.split(',') : undefined,
      salaryMin,
      salaryMax,
      page,
      limit,
      sortBy,
    });
  }

  @Get('search')
  @ApiOperation({ summary: 'Search jobs by query' })
  @ApiQuery({ name: 'q', required: true })
  @ApiQuery({ name: 'location', required: false })
  async search(
    @Query('q') query: string,
    @Query('location') location?: string,
  ) {
    return this.jobsService.search(query, location);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get job by ID' })
  async findOne(@Param('id') id: string) {
    return this.jobsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new job posting' })
  async create(@Body() jobData: Partial<any>) {
    return this.jobsService.create(jobData);
  }
}
