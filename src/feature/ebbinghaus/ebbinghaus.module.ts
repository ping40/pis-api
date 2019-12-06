import { Module } from '@nestjs/common';
import { KnowledgePointController } from './controller/knowledgepoint.controller';
import { KnowledgePointService } from './service/knowledgepoint.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KnowledgePointEntity } from './entities/knowledgepoint.entity';
import { KnowledgePointCommentEntity } from './entities/knowledgepointcomment.entity';
import { KnowledgePointLogEntity } from './entities/knowledgepointlog.entity';
import { KnowledgePointLogService } from './service/knowledgepointlog.service';
import { KnowledgePointLogController } from './controller/knowledgepointlog.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([KnowledgePointEntity]),
    TypeOrmModule.forFeature([KnowledgePointCommentEntity]),
    TypeOrmModule.forFeature([KnowledgePointLogEntity]),
  ],
  providers: [
    KnowledgePointService,
    KnowledgePointLogService,
  ],
  controllers: [
    KnowledgePointController,
    KnowledgePointLogController,
  ],
})
export class EbbinghausModule {}
