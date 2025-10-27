import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<Array<'superadmin'|'usuario'>>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (!roles || roles.length === 0) return true; 

    const req = ctx.switchToHttp().getRequest();
    const user = req.user as { role?: 'superadmin'|'usuario' };
    if (!user?.role) throw new ForbiddenException('No role on user');

    if (!roles.includes(user.role)) {
      throw new ForbiddenException('No tienes permisos para acceder a este recurso');
    }
    return true;
  }
}
