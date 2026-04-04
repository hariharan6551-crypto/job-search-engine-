import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between, In } from 'typeorm';
import { JobEntity } from './job.entity';

interface JobFilterOptions {
  location?: string;
  type?: string;
  skills?: string[];
  salaryMin?: number;
  salaryMax?: number;
  page: number;
  limit: number;
  sortBy: string;
}

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobRepository: Repository<JobEntity>,
  ) {}

  async findAll(options: JobFilterOptions) {
    const { location, type, skills, salaryMin, salaryMax, page, limit, sortBy } = options;

    const queryBuilder = this.jobRepository.createQueryBuilder('job');
    queryBuilder.where('job.isActive = :isActive', { isActive: true });

    if (location) {
      queryBuilder.andWhere('job.location ILIKE :location', {
        location: `%${location}%`,
      });
    }

    if (type) {
      queryBuilder.andWhere('job.type = :type', { type });
    }

    if (salaryMin) {
      queryBuilder.andWhere('job.salaryMin >= :salaryMin', { salaryMin });
    }

    if (salaryMax) {
      queryBuilder.andWhere('job.salaryMax <= :salaryMax', { salaryMax });
    }

    // Sorting
    const sortField = ['postedAt', 'salaryMin', 'title'].includes(sortBy)
      ? sortBy
      : 'postedAt';
    queryBuilder.orderBy(`job.${sortField}`, 'DESC');

    // Pagination
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async search(query: string, location?: string) {
    const queryBuilder = this.jobRepository.createQueryBuilder('job');
    queryBuilder.where('job.isActive = :isActive', { isActive: true });
    queryBuilder.andWhere(
      '(job.title ILIKE :query OR job.company ILIKE :query OR job.description ILIKE :query)',
      { query: `%${query}%` },
    );

    if (location) {
      queryBuilder.andWhere('job.location ILIKE :location', {
        location: `%${location}%`,
      });
    }

    queryBuilder.orderBy('job.postedAt', 'DESC');
    queryBuilder.take(50);

    const [data, total] = await queryBuilder.getManyAndCount();
    return { data, total };
  }

  async findById(id: string): Promise<JobEntity> {
    const job = await this.jobRepository.findOne({ where: { id } });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }

  async create(jobData: Partial<JobEntity>): Promise<JobEntity> {
    const job = this.jobRepository.create(jobData);
    return this.jobRepository.save(job);
  }

  async findByLocation(location: string, limit: number = 20): Promise<JobEntity[]> {
    return this.jobRepository.find({
      where: { location: Like(`%${location}%`), isActive: true },
      order: { postedAt: 'DESC' },
      take: limit,
    });
  }
}
