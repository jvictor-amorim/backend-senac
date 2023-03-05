/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log("Iniciando o Easy-Order API " + process.env.JWT_SECRET);
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();


  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Documentação com Swagger - Easy-Order API')
    .setDescription(
      'O Easy-Order é um projeto desenvolvido em NodeJS e Angular com o objetivo de simulação de um cardápio digital',
    )
    .setVersion('1.0')
    .addTag('Usuários')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(8000);
}
bootstrap();
