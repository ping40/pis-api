import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';

async function bootstrap() {
  initializeTransactionalContext(); // Initialize cls-hooked

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
