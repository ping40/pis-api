import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('kp')
export class KnowledgePointEntity { //知识点，每天可以有多个，过了今天就不能修改, 是Data Mapper pattern，不是Active Record pattern
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column('text')
  content: string;

  @Column()
  createDate: Date;

  @Column()
  allDone: boolean;
}