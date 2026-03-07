import { userRepository, UserRepository } from "./UserRepository";
import { NewProps, User, UserId } from "./User";
import { PasswordHasher } from "./services/PasswordHasher";

export class UserService {
    constructor(
        private userRepository: UserRepository,
        private passwordHasher: PasswordHasher,
    ) { }

    async create(props: NewProps) {
        const hashedPassword = await this.passwordHasher.hash(props.password);
        return this.userRepository.save(User.new({ ...props, password: hashedPassword }));
    }

    async update(user: User) {
        return this.userRepository.save(user);
    }

    async delete(id: UserId): Promise<User> {
        return this.userRepository.delete(id);
    }
}

export const userService = new UserService(userRepository, new PasswordHasher());

