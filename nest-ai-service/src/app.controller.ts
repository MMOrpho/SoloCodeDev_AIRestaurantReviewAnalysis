import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AnalyzeRequestDto } from './dto/analyze-request.dto';

@Controller('restaurant') // <-- Checks out the first half of the URL
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('ai-report')
  async getAiReport(@Body() body: AnalyzeRequestDto) {
    const report = await this.appService.analyzeRestaurantReviews(body.customPromptOverride);
    return {
      success: true,
      serviceProvider: 'NestJS AI Agent Layer',
      dataOrigin: 'Java Spring Boot Maven Microservice',
      report: report,
    };
  }
}