import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  
  @IsString()
  readonly name: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly cpf: string;

  @IsString()
  readonly phone: string;

  @IsString()
  readonly role: 'Admin' | 'Editor' | 'Tutor' | 'Ong';

  @IsOptional()
  @IsDate()
  readonly updated_at: Date;
  
  @IsOptional()
  @IsDate()
  readonly deleted_at: Date;
}
