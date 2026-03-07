import { ruleOptionRepository, RuleOptionRepository } from '../repositories/RuleOptionRepository';
import { RuleOption, RuleOptionId, NewRuleOptionProps } from '../entities/RuleOption';

export class RuleOptionService {
    constructor(private ruleOptionRepository: RuleOptionRepository) { }

    async create(props: NewRuleOptionProps): Promise<RuleOption> {
        return this.ruleOptionRepository.save(RuleOption.new(props));
    }

    async update(option: RuleOption): Promise<RuleOption> {
        return this.ruleOptionRepository.save(option);
    }

    async getById(id: RuleOptionId): Promise<RuleOption | undefined> {
        return this.ruleOptionRepository.getById(id);
    }

    async delete(id: RuleOptionId): Promise<RuleOption> {
        return this.ruleOptionRepository.delete(id);
    }
}

export const ruleOptionService = new RuleOptionService(ruleOptionRepository);
