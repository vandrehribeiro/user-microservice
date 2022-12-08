import { Controller, Get, Request } from '@nestjs/common';
import { Role } from './roles/role.enum';
import { Roles } from './roles/roles.decorator';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateUserEvent } from './create-user.event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('profile')
  @Roles(Role.TUTOR, Role.ONG, Role.ADMIN, Role.EDITOR)
  getProfile(@Request() req): any {
    return req.user;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Roles(Role.TUTOR, Role.ONG, Role.ADMIN, Role.EDITOR)
  @EventPattern('user_created')
  handleUserCreated(data: CreateUserEvent) {
    console.log('esta criando');
    
    this.appService.handleUserCreated(data);
  }

  @Roles(Role.TUTOR, Role.ONG, Role.ADMIN, Role.EDITOR)
  @MessagePattern({ cmd: 'get_analytics' })
  getAnalytics() {
    console.log('esta fazendo get');
    return this.appService.getAnalytics();
  }
}