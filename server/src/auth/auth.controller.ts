import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/dto/user.dto';
import { JwtGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() user: UserDto) {
    return this.authService.login(user);
  }

  @Post('/register')
  register(@Body() user: UserDto) {
    return this.authService.register(user);
  }

  @UseGuards(JwtGuard)
  @Get('/verify')
  verify() {
    return true;
  }
  

}
