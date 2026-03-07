import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { RuleRequirement, RuleRequirementId } from '../../core/domain/entities/RuleRequirement';
import { TypeormRuleOption } from './TypeormRuleOption';
import { TypeormGroup } from '../../../businesses/infrastructure/entities/TypeormGroup';
import { RuleOptionId } from '../../core/domain/entities/RuleOption';
import { GroupId } from '../../../businesses/core/domain/entities/Group';

@Entity('rule_requirements')
export class TypeormRuleRequirement {
    @PrimaryGeneratedColumn('uuid')
    id: RuleRequirementId;

    @Column({ type: 'uuid' })
    optionId: RuleOptionId;

    @Column({ type: 'uuid' })
    groupId: GroupId;

    @Column({ type: 'int' })
    minSignatures: number;

    @ManyToOne(() => TypeormRuleOption, (option) => option.requirements)
    option: TypeormRuleOption;

    @ManyToOne(() => TypeormGroup, (group) => group.ruleRequirements)
    group: TypeormGroup;

    toDomain(): RuleRequirement {
        return new RuleRequirement({
            id: this.id,
            option: { id: this.optionId },
            group: !!this.group ? this.group.toDomain() : { id: this.groupId },
            minSignatures: this.minSignatures,
        });
    }

    static fromDomain(requirement: RuleRequirement): TypeormRuleRequirement {
        const entity = new TypeormRuleRequirement();
        entity.id = requirement.id;
        entity.optionId = requirement.option.id;
        entity.groupId = requirement.group.id;
        entity.minSignatures = requirement.minSignatures;
        return entity;
    }
}
