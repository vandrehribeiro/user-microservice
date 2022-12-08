import { IsObject, IsString } from "class-validator";
import { CreateAddressDto } from "../../address/dto/create-address.dto";
import { CreateUserDto } from "../../users/dto/create-user.dto";

export class dataDTO {

    @IsObject()
    personal_data: CreateUserDto;
    
    @IsObject()
    address: CreateAddressDto;

    @IsString()
    password: string;
}