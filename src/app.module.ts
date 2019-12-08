import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/ConfigService';
import { FeatureModule } from './feature/feature.module';
import { AuthMiddleware } from './shared/user/auth.middleware';
import { UserModule } from './shared/user/user.module';
import { LoggerModule } from './shared/logger/logger.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(ConfigService.getTypeOrmConfig()),
    FeatureModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule  implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*');
  }
}
