import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { RuleOption, RuleOptionId } from '../../core/domain/entities/RuleOption';
import { TypeormSignatureRule } from './TypeormSignatureRule';
import { SignatureRuleId } from '../../core/domain/entities/SignatureRule';
import { TypeormRuleRequirement } from './TypeormRuleRequirement';

@Entity('rule_options')
export class TypeormRuleOption {
    @PrimaryGeneratedColumn('uuid')
    id: RuleOptionId;

    @Column({ type: 'uuid' })
    ruleId: SignatureRuleId;

    @ManyToOne(() => TypeormSignatureRule, (rule) => rule.options)
    rule: TypeormSignatureRule;

    @OneToMany(() => TypeormRuleRequirement, (requirement) => requirement.option)
    requirements: TypeormRuleRequirement[];

    toDomain(): RuleOption {
        return new RuleOption({
            id: this.id,
            ruleId: this.ruleId,
            requirements: this.requirements?.map((r) => r.toDomain()) ?? [],
        });
    }

    static fromDomain(option: RuleOption): TypeormRuleOption {
        const entity = new TypeormRuleOption();
        entity.id = option.id;
        entity.ruleId = option.ruleId;
        return entity;
    }
}
