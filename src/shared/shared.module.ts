import { Module } from '@nestjs/common';
import { SqliteModule } from './sqlite/sqlite.module';
import { UserModule } from './user/user.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [SqliteModule, UserModule, LoggerModule]
})
export class SharedModule {}
