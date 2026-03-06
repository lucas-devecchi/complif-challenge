import { TypeormConnectionManager } from '../../../../config/TypeormConnectionManager';
import { EntriesResult } from '../../../shared/domain/EntriesResult';
import { Pagination } from '../../../shared/domain/Pagination';
import { TypeormAccountRepository } from '../../infrastructure/repositories/TypeormAccountRepository';
import { Account, AccountId } from './Account';

export type GetAllParams = {
    pagination: Pagination;
  };

export interface AccountRepository {
    save(account: Account): Promise<Account>;
    getById(id: AccountId): Promise<Account | undefined>;
    getAll(params: GetAllParams): Promise<EntriesResult<Account>>;
    delete(id: AccountId): Promise<Account>;
    
}
export const accountRepository = new TypeormAccountRepository(TypeormConnectionManager.getDataSource());

