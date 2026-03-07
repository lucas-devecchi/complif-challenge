import { randomUUID } from 'crypto';
import { OptionalExceptFor } from '../../../../shared/domain/utils';
import { BusinessProps, BusinessStatus } from './Business';
import { UserProps } from '../../../../users/core/domain/User';

export type StatusHistoryId = string;

export type StatusHistoryProps = {
    id: StatusHistoryId;
    business: OptionalExceptFor<BusinessProps, 'id'>;
    previousStatus?: BusinessStatus;
    newStatus: BusinessStatus;
    user: OptionalExceptFor<UserProps, 'id'>;
};

export type NewProps = Omit<StatusHistoryProps, 'id'>;

export class StatusHistory {
    readonly id: StatusHistoryId;
    readonly business: OptionalExceptFor<BusinessProps, 'id'>;
    readonly previousStatus?: BusinessStatus;
    readonly newStatus: BusinessStatus;
    readonly user: OptionalExceptFor<UserProps, 'id'>;

    constructor(props: StatusHistoryProps) {
        this.id = props.id;
        this.business = props.business;
        this.previousStatus = props.previousStatus;
        this.newStatus = props.newStatus;
        this.user = props.user;
    }

    static new(props: NewProps): StatusHistory {
        return new StatusHistory({
            ...props,
            id: randomUUID(),
        });
    }
}
