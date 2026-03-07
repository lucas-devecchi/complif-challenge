import { TypeormConnectionManager } from '../../../../../config/TypeormConnectionManager';
import { EntriesResult } from '../../../../shared/domain/EntriesResult';
import { Pagination } from '../../../../shared/domain/Pagination';
import { TypeormRuleOptionRepository } from '../../../infrastructure/repositories/TypeormRuleOptionRepository';
import { RuleOption, RuleOptionId } from '../entities/RuleOption';
import { SignatureRuleId } from '../entities/SignatureRule';

export type GetAllParams = {
    pagination: Pagination;
    ruleId?: SignatureRuleId;
};

export interface RuleOptionRepository {
    save(option: RuleOption): Promise<RuleOption>;
    getById(id: RuleOptionId): Promise<RuleOption | undefined>;
    getAll(params: GetAllParams): Promise<EntriesResult<RuleOption>>;
    delete(id: RuleOptionId): Promise<RuleOption>;
    getByRuleId(ruleId: SignatureRuleId): Promise<RuleOption[]>;
}

export const ruleOptionRepository = new TypeormRuleOptionRepository(TypeormConnectionManager.getDataSource());
