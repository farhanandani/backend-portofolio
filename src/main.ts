/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { loggerInstance } from 'src/logger/winston.logger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { HeroModule } from './hero/hero.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: loggerInstance,
    }),
  });

  app.enableCors({
    origin: [
      'http://203.175.10.151',
      'http://203.175.10.151:80',
    ],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  const apiDocsPortal = new DocumentBuilder()
    .setTitle('Backend Farhan')
    .setDescription('API Documentation for Service name')
    .setVersion('1.0')
    .setContact(
      'Muhammad Farhan Andani',
      'https://www.linkedin.com/in/muhammadfarhanandani/',
      'farhanandani@gmail.com',
    )
    .addBearerAuth()
    .build();

  const apiDocumentFactory = () =>
    SwaggerModule.createDocument(app, apiDocsPortal, {
      include: [HeroModule],
    });

  SwaggerModule.setup('api', app, apiDocumentFactory);

  app.use(helmet());

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}

void bootstrap();
