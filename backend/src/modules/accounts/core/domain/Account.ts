import { randomUUID } from 'crypto';

export type AccountId = string;

export type AccountProps = {
    id: AccountId;
    accountNumber: string;
};

export type NewProps = Omit<AccountProps, 'id'>;

export class Account {
    readonly id: AccountId;
    readonly accountNumber: string;

    constructor(props: AccountProps) {
        this.id = props.id;
        this.accountNumber = props.accountNumber;
    }

    static new(props: NewProps): Account {
        return new Account({
            ...props,
            id: randomUUID(),
        });
    }
}
