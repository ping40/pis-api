// src/config/config.service.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class ConfigService {
  static getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: 'database.db',
      synchronize: true,
      logging: false,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    };
  }
}
