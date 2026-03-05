import { randomUUID } from 'crypto';
import { OptionalExceptFor } from '../../../shared/domain/utils';
import { AccountProps } from '../../../accounts/core/domain/Account';

export type BusinessId = string;

export type BusinessProps = {
    id: BusinessId;
    name: string;
    taxId: string;
    country: string;
    industry: string;
    account?: OptionalExceptFor<AccountProps, 'id'>;
};

export type NewProps = Omit<BusinessProps, 'id'>;

export class Business {
    readonly id: BusinessId;
    readonly name: string;
    readonly taxId: string;
    readonly country: string;
    readonly industry: string;

    constructor(props: BusinessProps) {
        this.id = props.id;
        this.name = props.name;
        this.taxId = props.taxId;
        this.country = props.country;
        this.industry = props.industry;
    }


    static new(props: NewProps): Business {
        return new Business({
            ...props,
            id: randomUUID(),
        });
    }
}