import { User } from '../schemas/users.schema';

export class UserDto {
  id: string;
  username: string;
  email: string;

  constructor(values: Partial<UserDto>) {
    this.id = values.id;
    this.username = values.username;
    this.email = values.email;
  }

  static from(user: User): UserDto {
    return new UserDto(user);
  }
}
