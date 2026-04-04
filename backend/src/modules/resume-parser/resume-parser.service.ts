import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ResumeParserService {
  private readonly aiEngineUrl = process.env.NEXT_PUBLIC_AI_API_URL || 'http://localhost:8000';

  async parseResume(file: Express.Multer.File) {
    try {
      // Forward file to AI engine for parsing
      const formData = new FormData();
      const blob = new Blob([file.buffer], { type: file.mimetype });
      formData.append('file', blob, file.originalname);

      const response = await axios.post(`${this.aiEngineUrl}/parse-resume`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 30000,
      });

      return {
        message: 'Resume parsed successfully',
        data: response.data,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to parse resume. AI engine may be unavailable.',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async getAnalysis(resumeId: string) {
    // Placeholder: In production, fetch from database
    return {
      id: resumeId,
      skills: ['JavaScript', 'TypeScript', 'React', 'Node.js'],
      experience: '3 years',
      education: 'B.Tech Computer Science',
      score: 82,
      analyzedAt: new Date().toISOString(),
    };
  }
}
