import { Module } from '@nestjs/common';
import { EbbinghausController } from './controller/ebbinghaus.controller';
import { EbbinghausService } from './service/ebbinghaus.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KnowledgePointEntity } from './entities/knowledgepoint.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([KnowledgePointEntity]),
  ],
  providers: [
    EbbinghausService,
  ],
  controllers: [EbbinghausController],
})
export class EbbinghausModule {}
