import { JwtService } from '@nestjs/jwt';
import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CanActivate } from './../../node_modules/@nestjs/common/interfaces/features/can-activate.interface.d';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    try {
      const [bearer, token] = request.headers.authorization.split(' ');
      if (bearer === 'Bearer' && token) {
        const user = this.jwtService.verify(token);
        request.user = user;
        return true;
      } else {
        throw new UnauthorizedException();
      }
    } catch (e) {
      throw new HttpException(
        'something went wrong',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
