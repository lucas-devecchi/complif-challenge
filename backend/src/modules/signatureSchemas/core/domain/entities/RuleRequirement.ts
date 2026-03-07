import { randomUUID } from 'crypto';
import { OptionalExceptFor } from '../../../../shared/domain/utils';
import { RuleOptionProps } from './RuleOption';
import { GroupProps } from '../../../../businesses/core/domain/entities/Group';

export type RuleRequirementId = string;


export type RuleRequirementProps = {
    id: RuleRequirementId;
    option: OptionalExceptFor<RuleOptionProps, 'id'>;
    group: OptionalExceptFor<GroupProps, 'id'>;
    minSignatures: number;
};

export type NewRuleRequirementProps = Omit<RuleRequirementProps, 'id'>;

export class RuleRequirement {
    readonly id: RuleRequirementId;
    readonly option: OptionalExceptFor<RuleOptionProps, 'id'>;
    readonly group: OptionalExceptFor<GroupProps, 'id'>;
    readonly minSignatures: number;

    constructor(props: RuleRequirementProps) {
        this.id = props.id;
        this.option = props.option;
        this.group = props.group;
        this.minSignatures = props.minSignatures;
    }

    static new(props: NewRuleRequirementProps): RuleRequirement {
        return new RuleRequirement({
            ...props,
            id: randomUUID(),
        });
    }
}
