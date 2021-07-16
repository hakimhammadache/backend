import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty()
    @IsNumber()
    id:number
    @IsNotEmpty()
    @IsString()
    role:string
}
