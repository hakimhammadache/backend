import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateParcelDto {
  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsNotEmpty()
  @IsNumber()
  length: number;

  @IsNumber()
  width: number;

  @IsNumber()
  height: number;

  @IsNumber()
  quantity: number;
}
