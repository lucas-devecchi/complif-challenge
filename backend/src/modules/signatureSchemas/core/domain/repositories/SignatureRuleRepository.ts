import { TypeormConnectionManager } from '../../../../../config/TypeormConnectionManager';
import { EntriesResult } from '../../../../shared/domain/EntriesResult';
import { Pagination } from '../../../../shared/domain/Pagination';
import { TypeormSignatureRuleRepository } from '../../../infrastructure/repositories/TypeormSignatureRuleRepository';
import { SignatureRule, SignatureRuleId } from '../entities/SignatureRule';
import { SignatureSchemaId } from '../entities/SignatureSchema';

export type GetAllParams = {
    pagination: Pagination;
    schemaId?: SignatureSchemaId;
};

export interface SignatureRuleRepository {
    save(rule: SignatureRule): Promise<SignatureRule>;
    getById(id: SignatureRuleId): Promise<SignatureRule | undefined>;
    getAll(params: GetAllParams): Promise<EntriesResult<SignatureRule>>;
    delete(id: SignatureRuleId): Promise<SignatureRule>;
    getBySchemaId(schemaId: SignatureSchemaId): Promise<SignatureRule[]>;
}

export const signatureRuleRepository = new TypeormSignatureRuleRepository(TypeormConnectionManager.getDataSource());
