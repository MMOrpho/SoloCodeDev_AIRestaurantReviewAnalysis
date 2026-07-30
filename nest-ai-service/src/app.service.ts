import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ChatOllama } from '@langchain/ollama';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { firstValueFrom } from 'rxjs';



@Injectable()
export class AppService {

  constructor(private readonly httpService: HttpService) {}

  async analyzeRestaurantReviews(userInstruction: string): Promise<string> {
    // 1. Fetch live review objects from running Java Maven server
    const javaUrl = 'http://localhost:8081/api/reviews';  //used instead of 8080 to prevent clashing
    const response = await firstValueFrom(this.httpService.get(javaUrl));
    const formattedReviews = JSON.stringify(response.data, null, 2);

    // 2. Connect directly to running Ollama application
    const model = new ChatOllama({
      baseUrl: 'http://localhost:11434', // This is Ollama's default local network port
      model: 'llama3.1:8b', // A fast, lightweight, and free model
      temperature: 0.3,
    });

    // 3. Define the prompt instructions for the local model. This could be where I format/structure the output in more detail
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', 'You are an elite restaurant business consultant AI agent.'],
      ['user', 'Focus Area: {instruction}\n\nReview Dataset:\n{reviews}']
    ]);

    // 4. Assemble the execution pipeline
    const chain = prompt.pipe(model).pipe(new StringOutputParser());

    // 5. Run the local model and return the text summary output
    return await chain.invoke({
      instruction: userInstruction,
      reviews: formattedReviews,
    });
  }

}
