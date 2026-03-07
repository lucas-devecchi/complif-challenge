import { userRepository, UserRepository } from '../domain/UserRepository';
import { PasswordHasher } from '../domain/services/PasswordHasher';
import { JwtService } from '../domain/services/JwtService';
import { InvalidCredentials } from '../domain/errors/InvalidCredentials';
import { UserLoginDto } from '../../../../delivery/dtos/userDTO';

export type LoginResult = {
    token: string;
    user: { id: string; email: string; name: string; role: string };
};

class Login {
    constructor(
        private userRepository: UserRepository,
        private passwordHasher: PasswordHasher,
        private jwtService: JwtService,
    ) { }

    async invoke(dto: UserLoginDto): Promise<LoginResult> {
        const user = await this.userRepository.getByEmail(dto.email);
        if (!user) throw new InvalidCredentials();

        const isValid = await this.passwordHasher.verify(dto.password, user.password);
        if (!isValid) throw new InvalidCredentials();

        const token = this.jwtService.sign({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        };
    }
}

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';
export const login = new Login(
    userRepository,
    new PasswordHasher(),
    new JwtService(JWT_SECRET),
);
