import { randomUUID } from 'crypto';
import { OptionalExceptFor } from '../../../../shared/domain/utils';
import { AccountProps } from '../../../../accounts/core/domain/Account';

export type SignatureSchemaId = string;

export type SignatureSchemaProps = {
    id: SignatureSchemaId;
    account: OptionalExceptFor<AccountProps, 'id'>;
    version: number;
};

export type NewProps = Omit<SignatureSchemaProps, 'id'>;

export class SignatureSchema {
    readonly id: SignatureSchemaId;
    readonly account: OptionalExceptFor<AccountProps, 'id'>;
    readonly version: number;

    constructor(props: SignatureSchemaProps) {
        this.id = props.id;
        this.account = props.account;
        this.version = props.version;
    }

    static new(props: NewProps): SignatureSchema {
        return new SignatureSchema({
            ...props,
            id: randomUUID(),
        });
    }
}

