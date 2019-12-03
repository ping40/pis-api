import { Module } from '@nestjs/common';
import { SqliteModule } from './sqlite/sqlite.module';

@Module({
  imports: [SqliteModule]
})
export class SharedModule {}
