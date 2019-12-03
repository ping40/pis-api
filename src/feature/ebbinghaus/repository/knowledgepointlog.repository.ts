import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { KnowledgePointLogEntity } from '../entities/knowledgepointlog.entity';

@EntityRepository(KnowledgePointLogEntity)
export class KnowledgePointLogRepository extends BaseRepository<KnowledgePointLogEntity> {}