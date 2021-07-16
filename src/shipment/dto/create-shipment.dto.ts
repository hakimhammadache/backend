import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { ShipmentStatus } from '../entities/shipment.entity';
import { CreateParcelDto } from './create-parcel.dto';

export class CreateshipmentDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/^yal-\d{4}\w{2}$|^yal-\d{3}\w{3}$/i)
  tracking: string;
  @IsArray()
  @ValidateNested()
  @Type(() => CreateParcelDto)
  parcels: CreateParcelDto[];
}
