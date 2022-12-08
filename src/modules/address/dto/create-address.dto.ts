import { IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  readonly state: string;

  @IsString()
  readonly city: string;

  @IsString()
  readonly district: string;

  @IsString()
  readonly street: string;

  @IsString()
  readonly number: string;

  @IsString()
  readonly zipcode: string;

  @IsString()
  readonly complement: string;

  @IsString()
  usersId: string;
}
