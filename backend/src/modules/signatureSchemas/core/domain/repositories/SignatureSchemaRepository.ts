import { TypeormConnectionManager } from '../../../../../config/TypeormConnectionManager';
import { AccountId } from '../../../../accounts/core/domain/Account';
import { EntriesResult } from '../../../../shared/domain/EntriesResult';
import { Pagination } from '../../../../shared/domain/Pagination';
import { TypeormSignatureSchemaRepository } from '../../../infrastructure/repositories/TypeormSignatureSchemaRepository';
import { SignatureSchema, SignatureSchemaId } from '../entities/SignatureSchema';

export type GetAllParams = {
    pagination: Pagination;
  };

export interface SignatureSchemaRepository {
    save(signatureSchema: SignatureSchema): Promise<SignatureSchema>;
    getById(id: SignatureSchemaId): Promise<SignatureSchema | undefined>;
    getAll(params: GetAllParams): Promise<EntriesResult<SignatureSchema>>;
    delete(id: SignatureSchemaId): Promise<SignatureSchema>;
    getNextVersionForAccount(accountId: AccountId): Promise<number>;
    
}
export const signatureSchemaRepository = new TypeormSignatureSchemaRepository(TypeormConnectionManager.getDataSource());


