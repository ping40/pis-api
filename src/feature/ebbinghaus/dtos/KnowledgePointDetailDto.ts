import { KnowledgePointPageDto } from './KnowledgePointPageDto';
import { KnowledgePointLogDto } from './KnowledgePointLogDto';
import { KnowledgePointCommentDto } from './KnowledgePointCommentDto';

export class KnowledgePointDetailDto extends KnowledgePointPageDto {
    content: string;

  logs: KnowledgePointLogDto[];
  comments: KnowledgePointCommentDto[];

    constructor(id: number, title: string, createDate: number) {
        super(id, title, createDate);
    }
}
