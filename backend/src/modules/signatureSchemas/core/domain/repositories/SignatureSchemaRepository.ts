import { TypeormConnectionManager } from '../../../../../config/TypeormConnectionManager';
import { EntriesResult } from '../../../../shared/domain/EntriesResult';
import { Pagination } from '../../../../shared/domain/Pagination';
import { TypeormSignatureSchemaRepository } from '../../../infrastructure/TypeormSignatureSchemaRepository';
import { SignatureSchema, SignatureSchemaId } from '../entities/SignatureSchema';

export type GetAllParams = {
    pagination: Pagination;
  };

export interface SignatureSchemaRepository {
    save(signatureSchema: SignatureSchema): Promise<SignatureSchema>;
    getById(id: SignatureSchemaId): Promise<SignatureSchema | null>;
    getAll(params: GetAllParams): Promise<EntriesResult<SignatureSchema>>;
    delete(id: SignatureSchemaId): Promise<SignatureSchema>;
    
}
export const signatureSchemaRepository = new TypeormSignatureSchemaRepository(TypeormConnectionManager.getDataSource());


