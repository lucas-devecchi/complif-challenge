import { EntriesResult } from "../../../shared/domain/EntriesResult";
import { User } from "../domain/User";
import { userRepository, UserRepository, GetAllParams } from "../domain/UserRepository";

class GetAllUsers {
  constructor(private userRepository: UserRepository) {}

  invoke(params: GetAllParams): Promise<EntriesResult<User>> {
    return this.userRepository.getAll(params);
  }
}

export const getAllUsers = new GetAllUsers(userRepository);


