import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
//import * as bcrypt from 'bcrypt';

import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {

  @Inject('ADDRESS_REPOSITORY')
  private addressRepository: Repository<Address>;

  async findAll() {
    return this.addressRepository.find();
  }

  async findOne(id: string) {
    const user = await this.addressRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User ID ${id} not found`);
    }
    return user;
  }

  async findUser(usersId: string) {
    const user = await this.addressRepository.findOne({
      where: { usersId },
    });

    if (!user) {
      throw new NotFoundException(`User ${usersId} not found`);
    }
    return user;
  }

  async create(createAddressDto: CreateAddressDto) {
    const address = this.addressRepository.create({ ...createAddressDto });
    
    return this.addressRepository.save(address);
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    const address = await this.addressRepository.preload({
      id,
      ...updateAddressDto
    });

    if (!address) {
      throw new NotFoundException(`Address ID ${id} not found`);
    }
    return this.addressRepository.save(address);
  }

  async remove(id: string) {
    const address = await this.addressRepository.findOne({
      where: { usersId: id },
    });
    
    if (!address) {
      throw new NotFoundException(`Address ID ${id} not found`);
    }
    
    const date = new Date();
    const preloadAddress = await this.addressRepository.preload({
      id: address.id,
      deleted_at: date
    });
    console.log(address);
    return this.addressRepository.save(preloadAddress);
  }

  // async remove(id: string) {
  //   const address = await this.addressRepository.findOne({
  //     where: { id },
  //   });

  //   if (!address) {
  //     throw new NotFoundException(`Address ID ${id} not found`);
  //   }

  //   return this.addressRepository.remove(address);
  // }
}
