import { Module } from '@nestjs/common';
import { SqliteModule } from './sqlite/sqlite.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [SqliteModule, UserModule]
})
export class SharedModule {}
