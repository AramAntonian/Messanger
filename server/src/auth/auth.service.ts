import bcrypt from 'bcrypt';
import { UserService } from './../user/user.service';
import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dto/user.dto';
import { CreatUserDto } from 'src/user/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(user: CreatUserDto) {
    const newUser = await this.userService.findOne(
      user.username,
      user.password,
    );
    if (newUser) {
      return this.genereteToken(newUser);
    } else {
      throw new HttpException('no such user', 406);
    }
  }

  async register(user: CreatUserDto) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const newUser = await this.userService.create(user);
    if (newUser) {
      return { message: 'registerd' };
    } else {
      throw new HttpException('username already exist', 406);
    }
  }

  private genereteToken(user: UserDto) {
    const payload = { username: user.username, id: user.id };
    return { token: this.jwtService.sign(payload) };
  }
}
