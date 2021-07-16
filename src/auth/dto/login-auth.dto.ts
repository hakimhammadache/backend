import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  @IsNotEmpty()
  @Length(16, 50)
  email: string;
  @IsNotEmpty()
  @IsString()
  @Length(8, 16)
  password: string;
}
