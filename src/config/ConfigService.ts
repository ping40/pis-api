// src/config/config.service.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/shared/user/model/user.model';

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

  static getAllUser(): User[] {
    const all: User[] = [
      {
        id: 1,
        name: 'ping40',
        password: 'nestjs'
      },
      {
        id: 2,
        name: 'qiao',
        password: 'ket'
      },
      {
        id: 3,
        name: 'guest',
        password: 'guest'
      },
    ];

    return all;
  }
}
