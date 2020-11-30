import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UserDto } from '../users/dto/user.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { JwtResponseDto } from './dto/jwt-response.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpirationPeriod: number;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.jwtExpirationPeriod = parseInt(
      configService.get<string>('JWT_EXPIRATION_PERIOD'),
      10,
    );
  }

  async loginByPassword(loginAttempt: LoginUserDto): Promise<JwtResponseDto> {
    const user: UserDto = await this.usersService.findOneByEmail(
      loginAttempt.email,
    );
    const valid = await this.usersService.verifyCredentials(loginAttempt);
    if (!valid || !user) {
      throw new UnauthorizedException();
    }
    return this.createJwtPayload(user);
  }

  async loginByJwt(jwtDto: JwtPayloadDto): Promise<JwtResponseDto> {
    const user: UserDto = await this.usersService.findOneByEmail(jwtDto.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.createJwtPayload(user);
  }

  createJwtPayload(user: UserDto): JwtResponseDto {
    const data: JwtPayloadDto = {
      email: user.email,
    };
    const jwt = this.jwtService.sign(data);
    return {
      expiresIn: this.jwtExpirationPeriod,
      token: jwt,
      email: user.email,
      id: user.id,
    };
  }
}
