import { Repository, FindConditions, SelectQueryBuilder } from 'typeorm';
import { PaginateQuery } from '../decorators/paginate';
declare type Column<T> = Extract<keyof T, string>;
declare type Order<T> = [Column<T>, 'ASC' | 'DESC'];
declare type SortBy<T> = Order<T>[];
export declare class Paginated<T> {
    data: T[];
    meta: {
        itemsPerPage: number;
        totalItems: number;
        currentPage: number;
        totalPages: number;
        sortBy: SortBy<T>;
        search: string;
    };
    links: {
        first?: string;
        previous?: string;
        current: string;
        next?: string;
        last?: string;
    };
}
export interface PaginateConfig<T> {
    sortableColumns: Column<T>[];
    searchableColumns?: Column<T>[];
    maxLimit?: number;
    defaultSortBy?: SortBy<T>;
    defaultLimit?: number;
    where?: FindConditions<T>;
    queryBuilder?: SelectQueryBuilder<T>;
}
export declare function paginate<T>(query: PaginateQuery, repo: Repository<T> | SelectQueryBuilder<T>, config: PaginateConfig<T>): Promise<Paginated<T>>;
export {};
