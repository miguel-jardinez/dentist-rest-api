import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') || '3000';
  const API_VERSION = configService.get<string>('API_VERSION');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Common Dentist rest API')
    .setDescription('Api with dentist services')
    .setVersion('1.0')
    .addTag('Dentist API')
    .build();

  app.setGlobalPrefix(API_VERSION);
  app.use(cookieParser());

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(PORT);
}
bootstrap();
