import { IsString, IsStrongPassword, Length } from 'class-validator';

export class CreatUserDto {
  @IsString()
  username: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;
}
