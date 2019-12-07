import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { KnowledgePointLogEntity } from './knowledgepointlog.entity';

@Entity('kp')
export class KnowledgePointEntity { //知识点，每天可以有多个，过了今天就不能修改, 是Data Mapper pattern，不是Active Record pattern
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column('text')
  content: string;

  @Column()
  createDate: number; // YYYYMMDD

  @Column()
  allDone: boolean;

  @OneToMany(type => KnowledgePointLogEntity, logs => logs.knowledgePointEntity)
    logs: KnowledgePointLogEntity[];
}