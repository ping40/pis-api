import { Module } from '@nestjs/common';
import { SqliteModule } from './sqlite/sqlite.module';
import { UserModule } from './user/user.module';
import { LoggerModule } from './logger/logger.module';
import {FeatureModule} from "../feature/feature.module";

@Module({
  imports: [SqliteModule, UserModule, LoggerModule]
})
export class SharedModule {}
