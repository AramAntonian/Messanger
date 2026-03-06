import { IsNumber, IsObject, IsString } from 'class-validator';
import { UserDto } from 'src/user/dto/user.dto';
import { ChatDto } from './chat.dto';

export class MessageDto {
  @IsNumber()
  id?: number;

  @IsString()
  message: string;

  @IsString()
  type: 'text' | 'file';

  @IsString()
  created_at: Date;

  @IsObject()
  sender: UserDto;

  @IsObject()
  chat: ChatDto;
}
