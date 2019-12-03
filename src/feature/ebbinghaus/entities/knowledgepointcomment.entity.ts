import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("kp_comment")
export class KnowledgePointCommentEntity {
  // 针对知识的修改批注，可以修改
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  kpId: number;

  @Column("text")
  content: string;

  @Column()
  createDate: Date;
}
