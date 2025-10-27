import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Array<'superadmin' | 'usuario'>) =>
  SetMetadata(ROLES_KEY, roles);
