import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { LoggerModule } from '../logger/logger.module';
import * as path from 'path';
import { ConfigModule } from 'nestjs-config';
import {EbbinghausModule} from "../../feature/ebbinghaus/ebbinghaus.module";

@Module({
  imports: [
    LoggerModule,
    ConfigModule.load(path.resolve(__dirname, '../../config', '**', '!(*.d).{ts,js}')),
    EbbinghausModule,
     ],
  controllers: [UserController],

})
export class UserModule {}
