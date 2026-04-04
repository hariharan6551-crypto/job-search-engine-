import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiConsumes } from '@nestjs/swagger';
import { ResumeParserService } from './resume-parser.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('resume')
@Controller('resume')
export class ResumeParserController {
  constructor(private readonly resumeParserService: ResumeParserService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('resume'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload and parse a resume' })
  async uploadResume(@UploadedFile() file: Express.Multer.File) {
    return this.resumeParserService.parseResume(file);
  }

  @Get(':id/analysis')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get resume analysis by ID' })
  async getAnalysis(@Param('id') id: string) {
    return this.resumeParserService.getAnalysis(id);
  }
}
