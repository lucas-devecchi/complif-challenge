import { randomUUID } from 'crypto';

export type UserId = string;

export enum UserRole {
    ADMIN = 'ADMIN',
    VIEWER = 'VIEWER',
}

export type UserProps = {
    id: UserId;
    name: string;
    email: string;
    password: string;
    role: UserRole;
};

export type NewProps = Omit<UserProps, 'id'>;

export class User {
    readonly id: UserId;
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly role: UserRole;

    constructor(props: UserProps) {
        this.id = props.id;
        this.name = props.name;
        this.email = props.email;
        this.password = props.password;
        this.role = props.role;
    }

    static new(props: NewProps): User {
        return new User({
            ...props,
            id: randomUUID(),
        });
    }
}

