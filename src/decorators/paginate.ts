import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface PaginateQuery {
  page?: number;
  limit?: number;
  sortBy?: [string, string][];
  search?: string;
  path: string;
}

export const Paginate = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): PaginateQuery => {
    const request: Request = ctx.switchToHttp().getRequest<Request>();
    const query: any = request.query;
    const path = request.protocol + '://' + request.hostname + request.url;

    const sortBy: [string, string][] = [];
    if (query.sortBy) {
      const params = !Array.isArray(query.sortBy)
        ? [query.sortBy]
        : query.sortBy;
      for (const param of params as string[]) {
        if (typeof param === 'string') {
          const items = param.split(':');
          if (items.length === 2) {
            sortBy.push(items as [string, string]);
          }
        }
      }
    }

    return {
      page: query.page ? parseInt(query.page.toString(), 10) : undefined,
      limit: query.limit ? parseInt(query.limit.toString(), 10) : undefined,
      sortBy: sortBy.length ? sortBy : undefined,
      search: query.search ? query.search.toString() : undefined,
      path,
    };
  },
);
