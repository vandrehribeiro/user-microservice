import { Body, Controller, Delete, HttpCode, HttpStatus, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Public, GetCurrentUserId, GetCurrentUser } from './common/decorators';
import { RtGuard } from './common/guards';
import { HashService } from './hash.service';
import { AuthDto, HashDto } from './dto';
import { Tokens } from './types';
import { Hash } from './entities/hash.entity';
import { dataDTO } from './dto/dataDto';
import { UsersService } from './../users/users.service';
import { AddressService } from '../address/address.service';
// import { TutorsService } from '../tutors/tutors.service';
// import { CreateTutorDto } from '../tutors/dto/create-tutor.dto';
// import { ONGsService } from '../ongs/ongs.service';
// import { CreateONGDto } from '../ongs/dto/create-ong.dto';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/role.enum';

@Controller()
export class HashController {
  constructor(
    private authService: HashService,
    private userService: UsersService,
    private addressService: AddressService,
    // private tutorService: TutorsService,
    // private ongService: ONGsService,
    ) {}

  @Public()
  @Roles(Role.FREE)
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(@Body() dto: dataDTO): Promise<Tokens>
  {
    const { personal_data , address, password } = dto;

    try {
      const SavedUser = await this.userService.create(personal_data);
      
      const user_id = SavedUser.id;
      address.usersId = user_id;
      
      try {
        const SavedAddress = await this.addressService.create(address);
        if (!SavedAddress) throw new Error('Não foi possivel registrar endereço, por favor entre em contato con nossos assistentes');
      } catch (error) {
        throw new Error(error);
      }

      // try {
      //   switch(personal_data.role) {
      //     case 'Tutor':
      //       const tutorDTO = { user_id: user_id, cpf: personal_data.cpf } as CreateTutorDto;
      //       await this.tutorService.create(tutorDTO);
      //     break;
          
      //     case 'Ong':
      //       const ONG_DTO = { user_id: user_id, cnpj: personal_data.cpf } as CreateONGDto;
      //       await this.ongService.create(ONG_DTO);
      //     break;
          
      //     case 'Admin':
      //     break;
          
      //     case 'Editor':
      //     break;

      //     default:
      //     throw new UnauthorizedException();
      //   }
      // } catch (error) {
      //   throw new Error(error);
      // }

      try {
        const role = personal_data.role;
        const data_dto: AuthDto = { user_id, password, role }
        const SavedHash = await this.authService.signupLocal(data_dto)

        return SavedHash;
      } catch (error) {
        throw new Error(error)
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  @Public()
  @Roles(Role.FREE)
  @Post('auth/login')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: HashDto): Promise<Tokens> 
  {
    return this.authService.signinLocal(dto);
  }

  @Post('logout')
  @Roles(Role.TUTOR, Role.ONG, Role.ADMIN, Role.EDITOR)
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string): Promise<Hash> {
    return this.authService.logout(userId);
  }

  @Public()
  @Roles(Role.TUTOR, Role.ONG, Role.ADMIN, Role.EDITOR)
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Delete(':id')
  @Roles(Role.TUTOR, Role.ONG, Role.ADMIN, Role.EDITOR)
  async remove(@GetCurrentUserId() userId: string) {
    try {
      const DeletedUser = await this.userService.remove(userId);
      try {
        const DeletedAddress = await this.addressService.remove(DeletedUser.id);
        if (!DeletedAddress) throw new Error('Não foi possivel deletar o endereço, por favor entre em contato con nossos assistentes');
      } catch (error) {
        throw new Error(error);
      }
      
      // try {
      //   switch(DeletedUser.role) {
      //     case 'Tutor':
      //       await this.tutorService.remove(DeletedUser.id);
      //     break;
          
      //     case 'Ong':
      //       await this.ongService.remove(DeletedUser.id);
      //     break;
          
      //     case 'Admin':
      //     break;
          
      //     case 'Editor':
      //     break;

      //     default:
      //     throw new UnauthorizedException();
      //   }
      // } catch (error) {
      //   throw new Error(error);
      // }

      try {
        await this.authService.logout(userId);
      } catch (error) {
        throw new Error(error);
      }
      return DeletedUser;
    } catch (error) {
      throw new Error(error);
    }
  }
}
