import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsOptions } from 'config';
import { AllExceptionsFilter } from './all-exceptions.filter';
// import { AppLoggerService } from './app-logger/app-logger.service'; // global logger

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // bufferLogs: true,
  });

  // import custom exceptions filter
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // app.useLogger(app.get(AppLoggerService));
  app.enableCors(corsOptions);
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
