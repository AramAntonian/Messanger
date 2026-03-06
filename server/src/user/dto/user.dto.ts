import { IsArray, IsNumber, IsString, Length } from 'class-validator';
import { ChatDto } from 'src/chat/dto/chat.dto';
import { MessageDto } from 'src/chat/dto/message.dto';

export class UserDto {
  @IsNumber()
  id?: number;

  @IsString()
  username: string;

  @IsArray()
  messages?: MessageDto[];

  @IsArray()
  chats?: ChatDto[];
}
