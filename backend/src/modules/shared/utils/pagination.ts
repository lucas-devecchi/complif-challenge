export interface PaginatedResult<T> {
    items: T[];
    pagination: {
        limit: number;
        offset: number;
        total: number;
    };
}

export const DEFAULT_LIMIT = 25;
export const MAX_LIMIT = 100;
export const DEFAULT_OFFSET = 0;