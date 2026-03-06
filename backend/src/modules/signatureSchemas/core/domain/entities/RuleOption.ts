import { randomUUID } from 'crypto';
import { RuleRequirement, RuleRequirementProps } from './RuleRequirement';
import { OptionalExceptFor } from '../../../../shared/domain/utils';

export type RuleOptionId = string;

export type RuleOptionProps = {
    id: RuleOptionId;
    ruleId: string;
    requirements?: OptionalExceptFor<RuleRequirementProps, 'id'>[];
};

export type NewRuleOptionProps = Omit<RuleOptionProps, 'id'> & {
    requirements?: Array<Omit<RuleRequirementProps, 'id' | 'optionId'>>;
};

export class RuleOption {
    readonly id: RuleOptionId;
    readonly ruleId: string;
    readonly requirements: OptionalExceptFor<RuleRequirementProps, 'id'>[];

    constructor(props: RuleOptionProps) {
        this.id = props.id;
        this.ruleId = props.ruleId;
        this.requirements = props.requirements ?? [];
    }

    static new(props: NewRuleOptionProps): RuleOption {
        return new RuleOption({
            ...props,
            id: randomUUID(),
        });
    }
}
