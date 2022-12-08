import { Body, Controller, Get, Param, Post, Patch, Delete, UseGuards } from '@nestjs/common';
//import { JwtAuthGuard } from '../auth/jwt-auth.guard1';

import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
export class AddressController {
    constructor(private readonly AddressService: AddressService) {}
    
    @Get()
    findAll() {
        return this.AddressService.findAll();
    }
    
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.AddressService.findOne(id);
    }
    
    @Post()
    create(@Body() createAddressDto: CreateAddressDto) {
        return this.AddressService.create(createAddressDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
        return this.AddressService.update(id, updateAddressDto);
    }
  
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //      return this.AddressService.remove(id);
    // }
}
