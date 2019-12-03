import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('kp_log')
export class KnowledgePointLogEntity {
  // 知识点的复习记录
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  kpId: number;

  @Column()
  reviewDate: Date;
}
