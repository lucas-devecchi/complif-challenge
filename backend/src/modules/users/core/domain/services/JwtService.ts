import jwt, { SignOptions } from 'jsonwebtoken';
import { UserId } from '../User';
import { UserRole } from '../User';

export type JwtPayload = {
    id: UserId;
    email: string;
    role: UserRole;
};

export class JwtService {
    constructor(private readonly secret: string, private readonly expiresIn: string = '7d') { }

    sign(payload: JwtPayload): string {
        return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn } as SignOptions);
    }

    verify(token: string): JwtPayload {
        return jwt.verify(token, this.secret) as JwtPayload;
    }
}
