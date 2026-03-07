import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export class PasswordHasher {
    async hash(plainPassword: string): Promise<string> {
        return bcrypt.hash(plainPassword, SALT_ROUNDS);
    }

    async verify(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
}
