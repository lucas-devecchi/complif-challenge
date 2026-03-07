import { UserRole } from "../../modules/users/core/domain/User";

export type CreateUserDto = {
    name: string;
    email: string;
    password: string;
    role: UserRole;
};

export type UserLoginDto = {
    email: string;
    password: string;
};
