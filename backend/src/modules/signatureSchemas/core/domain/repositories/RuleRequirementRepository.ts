import { TypeormConnectionManager } from '../../../../../config/TypeormConnectionManager';
import { EntriesResult } from '../../../../shared/domain/EntriesResult';
import { Pagination } from '../../../../shared/domain/Pagination';
import { RuleRequirement, RuleRequirementId } from '../entities/RuleRequirement';
import { RuleOptionId } from '../entities/RuleOption';
import { TypeormRuleRequirementRepository } from '../../../infrastructure/repositories/TypeormRuleRequirementRepository';

export type GetAllParams = {
    pagination: Pagination;
    optionId?: RuleOptionId;
};

export interface RuleRequirementRepository {
    save(requirement: RuleRequirement): Promise<RuleRequirement>;
    getById(id: RuleRequirementId): Promise<RuleRequirement | undefined>;
    getAll(params: GetAllParams): Promise<EntriesResult<RuleRequirement>>;
    delete(id: RuleRequirementId): Promise<RuleRequirement>;
    getByOptionId(optionId: RuleOptionId): Promise<RuleRequirement[]>;
}

export const ruleRequirementRepository = new TypeormRuleRequirementRepository(TypeormConnectionManager.getDataSource());
