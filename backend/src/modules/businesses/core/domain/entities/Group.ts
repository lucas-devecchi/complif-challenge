import { randomUUID } from 'crypto';
import { BusinessProps } from './Business';
import { OptionalExceptFor } from '../../../../shared/domain/utils';

export type GroupId = string;

export type GroupProps = {
    id: GroupId;
    name: string;
    business: OptionalExceptFor<BusinessProps, 'id'>;
};

export type NewGroupProps = Omit<GroupProps, 'id'>;

export class Group {
    readonly id: GroupId;
    readonly name: string;
    readonly business: OptionalExceptFor<BusinessProps, 'id'>;

    constructor(props: GroupProps) {
        this.id = props.id;
        this.business = props.business;
        this.name = props.name;
    }

    static new(props: NewGroupProps): Group {
        return new Group({
            ...props,
            id: randomUUID(),
        });
    }
}
