import { User, UserId, UserProps } from "../domain/User";
import { userRepository, UserRepository } from "../domain/UserRepository";
import { userService, UserService } from "../domain/UserService";
import { UserNotFound } from "../domain/errors/UserNotFound";

class UpdateUser {
    constructor(private userService: UserService, private repository: UserRepository) { }

    async invoke(id: UserId, params: Partial<Omit<UserProps, "id">>): Promise<User> {
        const user = await this.repository.getById(id);
        if (!user)
            throw new UserNotFound(id);

        const updatedUser = new User({ ...user, ...params });
        return this.userService.update(updatedUser);
    }
}

export const updateUser = new UpdateUser(userService, userRepository);


