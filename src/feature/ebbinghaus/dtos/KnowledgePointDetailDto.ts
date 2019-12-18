import { KnowledgePointPageDto } from './KnowledgePointPageDto';
import { KnowledgePointLogDto } from './KnowledgePointLogDto';

export class KnowledgePointDetailDto extends KnowledgePointPageDto {
    content: string;


  logs: KnowledgePointLogDto[];

    constructor(id: number, title: string, createDate: number) {
        super(id, title, createDate);
    }
}
