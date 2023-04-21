/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();


  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      //whitelist: true,
      //forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Documentação com Swagger - Easy-Order API')
    .setDescription(
      'Projeto back-end SENAC, transformação digital.',
    )
    .setVersion('1.0')
    .addTag('Usuários')
    .addTag('Cursos')
    .addTag('Vagas')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
