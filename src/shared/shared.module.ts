import { Module } from '@nestjs/common';
import { SqliteModule } from './sqlite/sqlite.module';
import { UserModule } from './user/user.module';
import { LoggerModule } from './logger/logger.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [SqliteModule, UserModule, LoggerModule, ConfigModule]
})
export class SharedModule {}
