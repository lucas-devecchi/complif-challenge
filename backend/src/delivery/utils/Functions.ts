import { Request } from "express";
import { BusinessId, BusinessStatus } from "../../modules/businesses/core/domain/entities/Business";
import { BadRequest } from "../../modules/shared/domain/errors/BadRequest";
import { Pagination } from "../../modules/shared/domain/Pagination";
import { AccountId } from "../../modules/accounts/core/domain/Account";


export enum PathParams {
    BUSINESS_ID = 'businessId',
    ACCOUNT_ID = 'accountId',
}

const getOptionalPathParam = (req: Request, param: PathParams): string | undefined => {
    return req.params[param];
};

const getPathParam = (req: Request, param: PathParams): string => {
    const value = getOptionalPathParam(req, param);
    if (!value) {
        throw new BadRequest(`${param} not found`);
    }
    return value;
};

// const getIntPathParam = (req: Request, param: PathParams): number => {
//     const value = getPathParam(req, param);
//     const parsed = parseInt(value);
//     if (isNaN(parsed)) {
//         throw new BadRequest(`${param} is not a number`);
//     }
//     return parsed;
// };

export const getBusinessId = (req: Request): BusinessId => {
    return getPathParam(req, PathParams.BUSINESS_ID);
};

export const getAccountId = (req: Request): AccountId => {
    return getPathParam(req, PathParams.ACCOUNT_ID);
};

export const getPage = (req: Request): number | undefined => {
    if (!req.query.page) {
        return undefined;
    }
    const page = parseInt(req.query.page as string);
    if (isNaN(page)) {
        throw new BadRequest('Invalid page');
    }
    return page;
};

export const getPageSize = (req: Request): number | undefined => {
    if (!req.query.pageSize) {
        return undefined;
    }
    const pageSize = parseInt(req.query.pageSize as string);
    if (isNaN(pageSize)) {
        throw new BadRequest('Invalid page size');
    }
    return pageSize;
};


export const getPagination = (req: Request): Pagination => {
    return Pagination.default({
        page: getPage(req),
        pageSize: getPageSize(req)
    });
};

// TODO: handle images and roles