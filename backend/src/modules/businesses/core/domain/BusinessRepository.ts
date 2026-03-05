import { TypeormConnectionManager } from '../../../../config/TypeormConnectionManager';
import { EntriesResult } from '../../../shared/domain/EntriesResult';
import { Pagination } from '../../../shared/domain/Pagination';
import { TypeormBusinessRepository } from '../../infrastructure/TypeormBusinessRepository';
import { Business, BusinessId } from './Business';

export type GetAllParams = {
    pagination: Pagination;
  };

export interface BusinessRepository {
    save(business: Business): Promise<Business>;
    getById(id: BusinessId): Promise<Business | undefined>;
    getAll(params: GetAllParams): Promise<EntriesResult<Business>>;
    delete(id: BusinessId): Promise<Business>;
    
}
export const businessRepository = new TypeormBusinessRepository(TypeormConnectionManager.getDataSource());
