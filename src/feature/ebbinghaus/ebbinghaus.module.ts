import { Module } from '@nestjs/common';
import { KnowledgePointController } from './controller/knowledgepoint.controller';
import { KnowledgePointService } from './service/knowledgepoint.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KnowledgePointEntity } from './entities/knowledgepoint.entity';
import { KnowledgePointCommentEntity } from './entities/knowledgepointcomment.entity';
import { KnowledgePointLogEntity } from './entities/knowledgepointlog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([KnowledgePointEntity]),
    TypeOrmModule.forFeature([KnowledgePointCommentEntity]),
    TypeOrmModule.forFeature([KnowledgePointLogEntity]),
  ],
  providers: [
    KnowledgePointService,
  ],
  controllers: [KnowledgePointController],
})
export class EbbinghausModule {}
