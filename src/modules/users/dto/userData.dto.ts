import { IsDate, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly email: string;

  @IsString()
  password: string;

  @IsString()
  readonly cpf: string;

  @IsString()
  readonly phone: string;

  @IsString()
  readonly role: 'Admin' | 'Editor' | 'Tutor' | 'Ong';
}
