import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import { UserDto } from 'src/user/dto/user.dto';
import { MessageDto } from './message.dto';

export class ChatDto {
  @IsNumber()
  id?: number;

  @IsString()
  name?: string;

  @IsBoolean()
  isGroup?: boolean;

  @IsArray()
  users?: UserDto[];

  @IsArray()
  messages?: MessageDto[];
}
