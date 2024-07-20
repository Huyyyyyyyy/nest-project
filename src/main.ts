import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //set up prefix
  app.setGlobalPrefix('api');

  // set up document
  const config = new DocumentBuilder()
    .setTitle('Booking API')
    .setDescription('The Booking API description')
    .setVersion('1.0')
    .addTag('Booking')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (ValidationError: ValidationError[] = []) => {
        return new BadRequestException(ValidationError);
      },
      validationError: {
        target: false,
      },
      transform: true,
    }),
  );
  await app.listen(+process.env.APP_PORT);
}
bootstrap();
