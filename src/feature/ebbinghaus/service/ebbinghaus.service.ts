import { Injectable } from '@nestjs/common';
import { KnowledgePointRepository } from '../repository/knowledgepoint.repository';
import { KnowledgePointCommentRepository } from '../repository/knowledgepointcomment.repository';
import { KnowledgePointLogRepository } from '../repository/knowledgepointlog.repository';
import { KnowledgePointEntity } from '../entities/knowledgepoint.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { KnowledgePointCommentEntity } from '../entities/knowledgepointcomment.entity';
import { KnowledgePointLogEntity } from '../entities/knowledgepointlog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EbbinghausService {
  constructor(
    @InjectRepository(KnowledgePointEntity) private readonly kpRepository: KnowledgePointRepository,
  //  @InjectRepository(KnowledgePointCommentEntity) private readonly kpcRepository: KnowledgePointCommentRepository,
   // @InjectRepository(KnowledgePointLogEntity) private readonly kplRepository: KnowledgePointLogRepository,
  ) {}

  async createKnowledgePoint(
    kp: KnowledgePointEntity,
  ): Promise<KnowledgePointEntity> {
    return this.kpRepository.save(kp);
  }
}
