import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { KnowledgePointEntity } from '../entities/knowledgepoint.entity';

@EntityRepository(KnowledgePointEntity)
export class KnowledgePointRepository extends BaseRepository<KnowledgePointEntity> {}