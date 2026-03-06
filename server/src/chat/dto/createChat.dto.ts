import { IsArray, IsString } from 'class-validator';

export class CreateChat {
  @IsArray()
  users: string[];
  @IsString()
  name: string;
}
