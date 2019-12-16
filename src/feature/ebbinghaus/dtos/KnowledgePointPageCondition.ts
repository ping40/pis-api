
export class KnowledgePointPageCondition {
    limit: number;
    pageNumber: number;
    filterContent: string;

    skip(): number {
        if (this.pageNumber > 0) {
            return (this.pageNumber - 1) * this.limit;
        }
        return 0;
    }
}
