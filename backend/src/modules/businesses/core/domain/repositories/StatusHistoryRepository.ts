import { TypeormConnectionManager } from '../../../../../config/TypeormConnectionManager';
import { BusinessId } from '../entities/Business';
import { EntriesResult } from '../../../../shared/domain/EntriesResult';
import { Pagination } from '../../../../shared/domain/Pagination';
import { StatusHistory, StatusHistoryId } from '../entities/StatusHistory';
import { TypeormStatusHistoryRepository } from '../../../infrastructure/repositories/TypeormStatusHistoryRepository';

export type GetAllParams = {
    pagination: Pagination;
    businessId?: BusinessId;
};

export interface StatusHistoryRepository {
    save(history: StatusHistory): Promise<StatusHistory>;
    getById(id: StatusHistoryId): Promise<StatusHistory | undefined>;
    getAll(params: GetAllParams): Promise<EntriesResult<StatusHistory>>;
    getByBusinessId(businessId: BusinessId): Promise<StatusHistory[]>;
}

export const statusHistoryRepository = new TypeormStatusHistoryRepository(TypeormConnectionManager.getDataSource());
