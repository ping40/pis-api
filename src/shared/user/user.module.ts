import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LoggerModule } from '../logger/logger.module';
import * as path from 'path';
import { ConfigModule } from 'nestjs-config';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.load(path.resolve(__dirname, '../../config', '**', '!(*.d).{ts,js}')),
     ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],

})
export class UserModule {}
