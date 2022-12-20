import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../module/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request?.headers?.authorization;
      if (!token) {
        throw new UnauthorizedException();
      }
      const payload = await this.jwtService.verify(token);
      if (!payload || !Number.isInteger(parseInt(payload.id))) {
        throw new UnauthorizedException();
      }

      request.currentUser = await this.userService.findOne(payload.id);

      if (!request.currentUser) {
        throw new UnauthorizedException();
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
