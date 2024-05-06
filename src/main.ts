import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { HttpLoggingInterceptor } from './common/interceptor/http-logger.interceptor';
import { LoggerService } from './common/services/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));
  const logger = app.get(LoggerService);
  app.useLogger(logger);
  app.useGlobalInterceptors(new HttpLoggingInterceptor(logger));
  app.setGlobalPrefix('api');
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT') || 3001;
  app.use(helmet());
  app.enableCors();
  app.enableShutdownHooks();

  await app.listen(port, () => {
    console.debug(`API Ferramas listening at port ${port} `);
  });
}
bootstrap();
