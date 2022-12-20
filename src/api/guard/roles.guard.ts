import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const actionRoles = this.reflector.get<string[]>('roles', context.getHandler());
    const controllerRoles = this.reflector.get<string[]>('roles', context.getClass());
    const requiredRoles = actionRoles || controllerRoles;

    if (!requiredRoles) {
      return true;
    }

    const currentUser = context.switchToHttp().getRequest().currentUser;
    if (!currentUser) {
      return false;
    }

    return requiredRoles.includes(currentUser.role);
  }
}
