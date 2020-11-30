import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { UserDto } from './dto/user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

const saltOrRound = 10;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOneById(id: string): Promise<UserDto> {
    const result = await this.userModel.findById(id);
    return UserDto.from(result);
  }

  async findOneByEmail(email: string): Promise<UserDto> {
    const result = await this.userModel.findOne({ email });
    return UserDto.from(result);
  }

  async registerUser(dto: RegisterUserDto): Promise<UserDto> {
    const salt = await bcrypt.genSalt(saltOrRound);
    const passwordHash = await bcrypt.hash(dto.password, salt);
    const newUser = new this.userModel({
      username: dto.username,
      email: dto.email,
      password: passwordHash,
    });
    const result = await newUser.save();
    return UserDto.from(result);
  }

  async verifyCredentials(dto: LoginUserDto): Promise<boolean> {
    const actual = await this.userModel.findOne({ email: dto.email });
    return await bcrypt.compare(dto.password, actual.password);
  }
}
