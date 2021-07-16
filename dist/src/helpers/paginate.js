"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = exports.Paginated = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
class Paginated {
}
exports.Paginated = Paginated;
async function paginate(query, repo, config) {
    let page = query.page || 1;
    const limit = Math.min(query.limit || config.defaultLimit || 20, config.maxLimit || 100);
    const sortBy = [];
    const search = query.search;
    const path = query.path;
    function isEntityKey(sortableColumns, column) {
        return !!sortableColumns.find((c) => c === column);
    }
    const { sortableColumns } = config;
    if (config.sortableColumns.length < 1)
        throw new common_1.ServiceUnavailableException();
    if (query.sortBy) {
        for (const order of query.sortBy) {
            if (isEntityKey(sortableColumns, order[0]) &&
                ['ASC', 'DESC'].includes(order[1])) {
                sortBy.push(order);
            }
        }
    }
    if (!sortBy.length) {
        sortBy.push(...(config.defaultSortBy || [[sortableColumns[0], 'ASC']]));
    }
    if (page < 1)
        page = 1;
    let [items, totalItems] = [[], 0];
    let queryBuilder;
    if (repo instanceof typeorm_1.Repository) {
        queryBuilder = repo
            .createQueryBuilder('e')
            .take(limit)
            .skip((page - 1) * limit);
        for (const order of sortBy) {
            queryBuilder.addOrderBy('e.' + order[0], order[1]);
        }
    }
    else {
        queryBuilder = repo.take(limit).skip((page - 1) * limit);
        for (const order of sortBy) {
            queryBuilder.addOrderBy(repo.alias + '.' + order[0], order[1]);
        }
    }
    const where = [];
    if (search && config.searchableColumns) {
        for (const column of config.searchableColumns) {
            where.push(Object.assign({ [column]: typeorm_1.Like(`%${search}%`) }, config.where));
        }
    }
    [items, totalItems] = await queryBuilder
        .where(where.length ? where : config.where || {})
        .getManyAndCount();
    let totalPages = totalItems / limit;
    if (totalItems % limit)
        totalPages = Math.ceil(totalPages);
    const options = `&limit=${limit}${sortBy
        .map((order) => `&sortBy=${order.join(':')}`)
        .join('')}${search ? `&search=${search}` : ''}`;
    const buildLink = (p) => path + '?page=' + p + options;
    const results = {
        data: items,
        meta: {
            itemsPerPage: limit,
            totalItems,
            currentPage: page,
            totalPages: totalPages,
            sortBy,
            search,
        },
        links: {
            first: page == 1 ? undefined : buildLink(1),
            previous: page - 1 < 1 ? undefined : buildLink(page - 1),
            current: buildLink(page),
            next: page + 1 > totalPages ? undefined : buildLink(page + 1),
            last: page == totalPages ? undefined : buildLink(totalPages),
        },
    };
    return Object.assign(new Paginated(), results);
}
exports.paginate = paginate;
//# sourceMappingURL=paginate.js.map