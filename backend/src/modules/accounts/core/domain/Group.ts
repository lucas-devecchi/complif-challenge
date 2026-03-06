import { randomUUID } from 'crypto';
import { OptionalExceptFor } from '../../../shared/domain/utils';
import { AccountProps } from './Account';

export type GroupId = string;

export type GroupProps = {
    id: GroupId;
    name: string;
    account: OptionalExceptFor<AccountProps, 'id'>;
};

export type NewGroupProps = Omit<GroupProps, 'id'>;

export class Group {
    readonly id: GroupId;
    readonly name: string;
    readonly account: OptionalExceptFor<AccountProps, 'id'>;

    constructor(props: GroupProps) {
        this.id = props.id;
        this.account = props.account;
        this.name = props.name;
    }

    static new(props: NewGroupProps): Group {
        return new Group({
            ...props,
            id: randomUUID(),
        });
    }
}
