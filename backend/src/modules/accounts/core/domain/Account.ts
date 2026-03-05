import { randomUUID } from 'crypto';
import { OptionalExceptFor } from '../../../shared/domain/utils';
import { BusinessProps } from '../../../businesses/core/domain/Business';
import { SignatureSchemaProps } from '../../../signatureSchemas/core/domain/entities/SignatureSchema';

export type AccountId = string;

export type AccountProps = {
    id: AccountId;
    accountNumber: string;
    business: OptionalExceptFor<BusinessProps, 'id'>;
    signatureSchema: OptionalExceptFor<SignatureSchemaProps, 'id'>;
};

export type NewProps = Omit<AccountProps, 'id'>;

export class Account {
    readonly id: AccountId;
    readonly accountNumber: string;
    readonly business: OptionalExceptFor<BusinessProps, 'id'>;
    readonly signatureSchema: OptionalExceptFor<SignatureSchemaProps, 'id'>;

    constructor(props: AccountProps) {
        this.id = props.id;
        this.accountNumber = props.accountNumber;
        this.business = props.business;
        this.signatureSchema = props.signatureSchema;
    }

    static new(props: NewProps): Account {
        return new Account({
            ...props,
            id: randomUUID(),
        });
    }
}
