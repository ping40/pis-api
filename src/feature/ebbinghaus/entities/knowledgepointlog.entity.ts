import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { KnowledgePointEntity } from './knowledgepoint.entity';

@Entity('kp_log')
export class KnowledgePointLogEntity {
  // 知识点的复习记录
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => KnowledgePointEntity, knowledgePointEntity => knowledgePointEntity.logs)
  knowledgePointEntity: KnowledgePointEntity;

  @Column()
  reviewDate: number;  // YYYYMMDD
}
