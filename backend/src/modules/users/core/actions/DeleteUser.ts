import { User, UserId } from "../domain/User";
import { userService, UserService } from "../domain/UserService";

class DeleteUser {
    constructor(private userService: UserService) { }

    async invoke(id: UserId): Promise<User> {
        return this.userService.delete(id);
    }
}

export const deleteUser = new DeleteUser(userService);

