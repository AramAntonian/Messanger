import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findOne(username: string) {
    return await this.userRepo.findOne({ where: { username: username } });
  }

  async create(user: UserDto) {
    const newUser: UserDto = { ...user };
    const isExist = await this.findOne(newUser.username);
    if (isExist?.username) {
      return false;
    }

    return this.userRepo.save(newUser);
  }

  async getAll() {
    return await this.userRepo.find();
  }

  async passwordCompare(password1: string, password2: string) {
    const res = await bcrypt.compare(password1, password2);
    return res;
  }
}
