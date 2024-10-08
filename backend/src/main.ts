import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({ origin: '*' }));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3002);
  console.info(`Server is running on port ${process.env.PORT || 3002}`);
}
bootstrap();
