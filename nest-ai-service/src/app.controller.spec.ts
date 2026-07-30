import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  let appService: AppService;

  beforeEach(async () => {
    // a mock/fake version of AppService so it doesn't try to call actual Java server or Ollama during a quick test
    const mockAppService = {
      analyzeRestaurantReviews: jest.fn().mockResolvedValue('Mocked AI Report Output'),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('restaurant/ai-report', () => {
    it('should return a structured AI payload', async () => {
      const mockDto = { customPromptOverride: 'Analyze service times.' };
      
      const result = await appController.getAiReport(mockDto);
      
      expect(result).toEqual({
        success: true,
        serviceProvider: 'NestJS AI Agent Layer',
        dataOrigin: 'Java Spring Boot Maven Microservice',
        report: 'Mocked AI Report Output',
      });
    });
  });
});
