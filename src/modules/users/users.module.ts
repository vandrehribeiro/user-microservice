import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/database.module';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';

import { UsersService } from './users.service';
import { LocalUsersService } from './localusers.service';
import { AddressService } from '../address/address.service';
import { addressProviders } from '../address/address.providers';
import { AddressModule } from '../address/address.module';

@Module({
    imports: [DatabaseModule, AddressModule],
    controllers: [UsersController],
    providers: [UsersService, AddressService, LocalUsersService, ...usersProviders,  ...addressProviders],

    exports: [UsersService, AddressService, LocalUsersService]
  
  })
  export class UsersModule {}
  