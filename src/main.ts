import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsOptions } from 'config';
import { AppLoggerService } from './app-logger/app-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(AppLoggerService));
  app.enableCors(corsOptions);
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
