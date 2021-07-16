"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paginate = void 0;
const common_1 = require("@nestjs/common");
exports.Paginate = common_1.createParamDecorator((_data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;
    const path = request.protocol + '://' + request.hostname + request.url;
    const sortBy = [];
    if (query.sortBy) {
        const params = !Array.isArray(query.sortBy)
            ? [query.sortBy]
            : query.sortBy;
        for (const param of params) {
            if (typeof param === 'string') {
                const items = param.split(':');
                if (items.length === 2) {
                    sortBy.push(items);
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
});
//# sourceMappingURL=paginate.js.map