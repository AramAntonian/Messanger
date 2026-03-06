import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/dto/user.dto';
import { JwtGuard } from './jwt-auth.guard';
import { CreatUserDto } from 'src/user/dto/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() user: CreatUserDto) {
    return this.authService.login(user);
  }

  @Post('/register')
  register(@Body() user: CreatUserDto) {
    return this.authService.register(user);
  }

  @UseGuards(JwtGuard)
  @Get('/verify')
  verify() {
    return true;
  }
}
