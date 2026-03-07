import { signatureRuleRepository, SignatureRuleRepository } from '../repositories/SignatureRuleRepository';
import { SignatureRule, SignatureRuleId, NewSignatureRuleProps } from '../entities/SignatureRule';

export class SignatureRuleService {
    constructor(private signatureRuleRepository: SignatureRuleRepository) { }

    async create(props: NewSignatureRuleProps): Promise<SignatureRule> {
        return this.signatureRuleRepository.save(SignatureRule.new(props));
    }

    async update(rule: SignatureRule): Promise<SignatureRule> {
        return this.signatureRuleRepository.save(rule);
    }

    async getById(id: SignatureRuleId): Promise<SignatureRule | undefined> {
        return this.signatureRuleRepository.getById(id);
    }

    async delete(id: SignatureRuleId): Promise<SignatureRule> {
        return this.signatureRuleRepository.delete(id);
    }
}

export const signatureRuleService = new SignatureRuleService(signatureRuleRepository);
