import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/database.module';

import { AddressController } from './address.controller';
import { addressProviders } from './address.providers';

import { AddressService } from './address.service';

@Module({
    imports: [DatabaseModule],
    controllers: [AddressController],
    providers: [AddressService, ...addressProviders],

    exports: [AddressService]
  
  })
  export class AddressModule {}
  