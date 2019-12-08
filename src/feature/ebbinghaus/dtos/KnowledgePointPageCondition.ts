
export class KnowledgePointPageCondition {
    limit: number;
    pageNumber: number;

    skip(): number {
        if (this.pageNumber > 0) {
            return (this.pageNumber - 1) * this.limit;
        }
        return 0;
    }
}
