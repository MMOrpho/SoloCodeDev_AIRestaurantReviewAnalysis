import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enforce automatic input checking on every route
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strips away any unexpected properties sent by users
    forbidNonWhitelisted: true, // Throws an error if extra properties are sent
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
