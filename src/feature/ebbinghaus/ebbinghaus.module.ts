import { Module } from '@nestjs/common';
import { KnowledgePointController } from './controller/knowledgepoint.controller';
import { KnowledgePointService } from './service/knowledgepoint.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KnowledgePointEntity } from './entities/knowledgepoint.entity';
import { KnowledgePointCommentEntity } from './entities/knowledgepointcomment.entity';
import { KnowledgePointLogEntity } from './entities/knowledgepointlog.entity';
import { KnowledgePointLogService } from './service/knowledgepointlog.service';
import { KnowledgePointLogController } from './controller/knowledgepointlog.controller';
import { KnowledgePointCommentController } from './controller/knowledgepointcomment.controller';
import { KnowledgePointCommentService } from './service/knowledgepointcomment.service';
import { LoggerModule } from '../../shared/logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([KnowledgePointEntity]),
    TypeOrmModule.forFeature([KnowledgePointCommentEntity]),
    TypeOrmModule.forFeature([KnowledgePointLogEntity]),
    LoggerModule,
  ],
  providers: [
    KnowledgePointService,
    KnowledgePointLogService,
    KnowledgePointCommentService,
  ],
  controllers: [
    KnowledgePointController,
    KnowledgePointLogController,
    KnowledgePointCommentController,
  ],
})
export class EbbinghausModule {}
