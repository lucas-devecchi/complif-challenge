import { ruleRequirementRepository, RuleRequirementRepository } from '../repositories/RuleRequirementRepository';
import { RuleRequirement, RuleRequirementId, NewRuleRequirementProps } from '../entities/RuleRequirement';

export class RuleRequirementService {
    constructor(private ruleRequirementRepository: RuleRequirementRepository) { }

    async create(props: NewRuleRequirementProps): Promise<RuleRequirement> {
        return this.ruleRequirementRepository.save(RuleRequirement.new(props));
    }

    async update(requirement: RuleRequirement): Promise<RuleRequirement> {
        return this.ruleRequirementRepository.save(requirement);
    }

    async getById(id: RuleRequirementId): Promise<RuleRequirement | undefined> {
        return this.ruleRequirementRepository.getById(id);
    }

    async delete(id: RuleRequirementId): Promise<RuleRequirement> {
        return this.ruleRequirementRepository.delete(id);
    }
}

export const ruleRequirementService = new RuleRequirementService(ruleRequirementRepository);
