import { IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  message: string;

  @IsString()
  type: 'text' | 'file';

  @IsString()
  created_at: Date;

  @IsNumber()
  sender: number;

  @IsNumber()
  chat: number;
}
