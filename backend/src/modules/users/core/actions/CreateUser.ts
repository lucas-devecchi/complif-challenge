import { userService, UserService } from '../domain/UserService';
import { NewProps, User, UserRole } from '../domain/User';
import { CreateUserDto } from '../../../../delivery/dtos/userDTO';

class CreateUser {
  constructor(private userService: UserService) { }

  async invoke(props: NewProps): Promise<User> {
    return this.userService.create({ ...props, role: props.role ?? UserRole.VIEWER });
  }
}

export const createUser = new CreateUser(userService);






