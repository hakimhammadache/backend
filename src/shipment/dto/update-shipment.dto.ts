import { PartialType } from '@nestjs/mapped-types';
import { IsEnum } from 'class-validator';
import { ShipmentStatus } from '../entities/shipment.entity';
import { CreateshipmentDto } from './create-shipment.dto';

export class UpdateshipmentDto extends PartialType(CreateshipmentDto) {
  @IsEnum(ShipmentStatus)
  status: ShipmentStatus;
}
