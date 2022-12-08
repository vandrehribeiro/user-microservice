import { SetMetadata } from '@nestjs/common';
import { Role } from './role.enum';
//export const Roles = (...roles: string[]) => SetMetadata('roles', roles)
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles)