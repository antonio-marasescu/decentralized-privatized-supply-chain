export class RegisterUserDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;

  constructor(values: Partial<RegisterUserDto>) {
    this.username = values.username;
    this.email = values.email;
    this.password = values.password;
  }
}
