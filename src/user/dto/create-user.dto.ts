import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { Role } from 'src/role/entities/role.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(3, 50)
  name: string;
  @IsNotEmpty()
  @IsEmail()
  @Length(16, 50)
  email: string;
  @IsNotEmpty()
  @IsString()
  @Length(8, 16)
  password: string;
  @IsNotEmpty()
  @IsString()
  @Length(4, 30)
  station: string;
  @IsNotEmpty()
  @IsString()
  @Length(10)
  phoneNumber: string;
  @IsNotEmpty()
  @IsNumber()
  roleId:number;
}
