import { NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { HttpLoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Security
  app.use(helmet());
  app.use(compression());

  // CORS
  app.enableCors({
    origin: configService.get('CORS_ORIGIN', '*'),
    credentials: true,
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map((error) => ({
          field: error.property,
          message: Object.values(error.constraints || {}).join(', '),
        }));
        return new BadRequestException({
          message: 'Validation failed',
          errors: formattedErrors,
        });
      },
    }),
  );

  // Interceptors & Filters
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(
    new TimeoutInterceptor(),
    new HttpLoggingInterceptor(),
  );

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('EdTech Learning Platform API')
    .setDescription('Complete educational platform API documentation')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addServer('http://localhost:3000', 'Development')
    .addServer('https://api.edtech.com', 'Production')
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Users', 'User management')
    .addTag('Courses', 'Course management')
    .addTag('Lectures', 'Video lectures')
    .addTag('Quizzes', 'Quiz management')
    .addTag('Progress', 'Student progress tracking')
    .addTag('Analytics', 'Learning analytics')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // Health Check Endpoint
  app.get('/health', () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  }));

  const port = configService.get('PORT', 3000);
  const nodeEnv = configService.get('NODE_ENV', 'development');

  await app.listen(port, '0.0.0.0');
  console.log(`
╔════════════════════════════════════════════════════════╗
║     EdTech Learning Platform - API Server Started      ║
╠════════════════════════════════════════════════════════╣
║ Environment: ${nodeEnv.padEnd(41)} ║
║ Port: ${port.toString().padEnd(47)} ║
║ Swagger Docs: http://localhost:${port}/api/docs          ║
║ Health Check: http://localhost:${port}/health            ║
╚════════════════════════════════════════════════════════╝
  `);
}

bootstrap().catch((err) => {
  console.error('Fatal error starting application:', err);
  process.exit(1);
});
