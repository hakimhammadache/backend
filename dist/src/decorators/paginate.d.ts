export interface PaginateQuery {
    page?: number;
    limit?: number;
    sortBy?: [string, string][];
    search?: string;
    path: string;
}
export declare const Paginate: (...dataOrPipes: unknown[]) => ParameterDecorator;
