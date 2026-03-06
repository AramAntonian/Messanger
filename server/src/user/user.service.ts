import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { CreatUserDto } from './dto/createUser.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findOne(
    user: string | number,
    password?: string,
    rels: string[] = [],
  ): Promise<UserDto | null> {
    const target = await this.userRepo.findOne({
      where: typeof user === 'string' ? { username: user } : { id: user },
      relations: rels,
    });
    if(!target){
      return null
    }
    if (password) {
      const isSame = await this.passwordCompare(password, target.password);
      if (isSame) {
        return target;
      } else {
        throw new HttpException('invalid password', HttpStatus.BAD_REQUEST);
      }
    }

    return target;
  }

  async create(user: CreatUserDto) {
    const newUser = { ...user };
    const isExist = await this.findOne(newUser.username, '', [
      'chats',
      'messages',
    ]);
    if (isExist?.id) {
      return false;
    }

    return await this.userRepo.save(newUser);
  }

  async getAll() {
    return await this.userRepo.find();
  }

  async passwordCompare(password1: string, password2: string) {
    const res = await bcrypt.compare(password1, password2);
    return res;
  }
}
