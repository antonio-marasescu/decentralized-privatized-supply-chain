import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtResponseDto } from './dto/jwt-response.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET'),
      ignoreExpiration: true, // to be removed
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayloadDto): Promise<JwtResponseDto> {
    const jwtResponseDto = await this.authService.loginByJwt(payload);
    if (!jwtResponseDto) {
      throw new UnauthorizedException();
    }
    return jwtResponseDto;
  }
}
