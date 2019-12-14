import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  initializeTransactionalContext(); // Initialize cls-hooked

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  const options = new DocumentBuilder()
    .setTitle('pis-api')
    .setDescription('The Personal Intelligent System API description')
    .setVersion('1.0')
    .addTag('api1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api2', app, document);

  await app.listen(3000);
}
bootstrap();
