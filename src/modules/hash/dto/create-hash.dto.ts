import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateHashDto {
  @IsNotEmpty()
  @IsString()
  readonly user_id: string;

  @IsNotEmpty()
  @IsString()
  readonly hash: string;

  @IsNotEmpty()
  @IsString()
  readonly role: 'Admin' | 'Editor' | 'Tutor' | 'Ong';

  @IsNotEmpty()
  @IsString()
  readonly hashed_rt: string;

  @IsDate()
  readonly updated_at: Date;
}
