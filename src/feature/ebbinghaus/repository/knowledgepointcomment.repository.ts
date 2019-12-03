import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { KnowledgePointCommentEntity } from '../entities/knowledgepointcomment.entity';

@EntityRepository(KnowledgePointCommentEntity)
export class KnowledgePointCommentRepository extends BaseRepository<KnowledgePointCommentEntity> {}