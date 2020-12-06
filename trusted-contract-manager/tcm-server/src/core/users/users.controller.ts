import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { JwtResponseDto } from '../auth/dto/jwt-response.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() registerUserDto: RegisterUserDto): Promise<UserDto> {
    return await this.usersService.registerUser(registerUserDto);
  }

  @Get('me')
  @UseGuards(AuthGuard())
  async getCurrentUser(@CurrentUser() user: JwtResponseDto): Promise<UserDto> {
    return await this.usersService.findOneById(user.id);
  }
}
