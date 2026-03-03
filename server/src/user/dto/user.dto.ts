import { IsNumber, IsString, Length } from 'class-validator';

export class UserDto {
  @IsString()
  username: string;

  @IsString()
  @Length(8, 54, {
    message: 'password must be more then 8 and less then 54 characters',
  })
  password: string;
}
