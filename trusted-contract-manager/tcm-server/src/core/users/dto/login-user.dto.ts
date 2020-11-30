export class LoginUserDto {
  readonly email: string;
  readonly password: string;

  constructor(values: Partial<LoginUserDto>) {
    this.email = values.email;
    this.password = values.password;
  }
}
