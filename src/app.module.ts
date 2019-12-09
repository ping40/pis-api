import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureModule } from './feature/feature.module';
import { AuthMiddleware } from './shared/user/auth.middleware';
import { UserModule } from './shared/user/user.module';
import { LoggerModule } from './shared/logger/logger.module';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';

@Module({
  imports: [
    UserModule,
    ConfigModule.load(path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
        useFactory: (config: ConfigService) => config.get('database'),
        inject: [ConfigService],
    }),
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
