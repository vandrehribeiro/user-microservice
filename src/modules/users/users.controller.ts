import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/role.enum';
import { GetCurrentUserId } from '../hash/common/decorators';


@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}
    
    @Get()
    @Roles(Role.TUTOR, Role.ONG, Role.ADMIN)
    findAll() {
        return this.usersService.findAll();
    }
    
    @Get(':id')
    @Roles(Role.TUTOR, Role.ONG)
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
  
    @Delete(':id')
    @Roles(Role.TUTOR, Role.ONG, Role.ADMIN)
    remove(@GetCurrentUserId() userId: string,) {
         return this.usersService.remove(userId);
    }
}
