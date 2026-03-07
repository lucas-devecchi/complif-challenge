import { User, UserId } from '../domain/User';
import { userRepository, UserRepository } from '../domain/UserRepository';
import { UserNotFound } from '../domain/errors/UserNotFound';

class GetUserById {
  constructor(private userRepository: UserRepository) { }

  async invoke(id: UserId): Promise<User> {
    const user = await this.userRepository.getById(id);
    if (!user)
      throw new UserNotFound(id);
    return user;
  }
}

export const getUserById = new GetUserById(userRepository);

