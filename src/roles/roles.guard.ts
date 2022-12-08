import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { UsersService } from "../modules/users/users.service";
import { Role } from "./role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly usersService: UsersService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass()
        ]);
        
        if (!requireRoles) { return false }
        if (requireRoles[0] === 'Free' ) { return true }
        
        const request = await context.switchToHttp().getRequest();
        const id = request.user.user_id;
        const user = await this.usersService.findOne(id);
        
        if (!user) throw new Error('User not found');
        
        return requireRoles.some((role) => user.role.includes(role));
    }
}