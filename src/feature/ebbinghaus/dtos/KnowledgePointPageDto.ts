
export class KnowledgePointPageDto {
    id: number;
    title: string;
    createDate: number; // YYYYMMDD

    reviewStatus: KnowledgePointStatus; // 本知识点(到今天为之)复习情况.

    constructor(id: number, title: string, createDate: number) {
        this.id = id;
        this.title = title;
        this.createDate = createDate;
    }
}

export enum KnowledgePointStatus {Done, PARTIAL_DONE, NO_DONE}
