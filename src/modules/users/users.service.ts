import { Injectable, Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  @Inject('USERS_REPOSITORY')
  private userRepository: Repository<User>;

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User ID ${id} not found`);
    }
    return user;
  }

  async findEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      return null;
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      const SavedUser = this.userRepository.save(user);
      if (!SavedUser) throw new UnauthorizedException();
      return SavedUser;
    } catch (error) {
      throw new Error(error);
    }    
  }
  
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto
    });

    if (!user) {
      throw new NotFoundException(`User ID ${id} not found`);
    }
    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = this.userRepository.findOne({
      where: { id }
    });
    
    if (!user) {
      throw new NotFoundException(`User ID ${id} not found`);
    }
    const date = new Date();
    const updatedTutor = await this.userRepository.preload({
      id,
      deleted_at: date
    });
    return this.userRepository.save(updatedTutor);
  }
}
