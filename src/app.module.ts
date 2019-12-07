import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/ConfigService';
import { FeatureModule } from './feature/feature.module';
import { AuthMiddleware } from './shared/user/auth.middleware';
import { UserModule } from './shared/user/user.module';

@Module({
  imports: [
    SharedModule,
    UserModule,
    TypeOrmModule.forRoot(ConfigService.getTypeOrmConfig()),
    FeatureModule,
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
