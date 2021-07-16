import { ShipmentStatus } from '../entities/shipment.entity';
import { CreateshipmentDto } from './create-shipment.dto';
declare const UpdateshipmentDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateshipmentDto>>;
export declare class UpdateshipmentDto extends UpdateshipmentDto_base {
    status: ShipmentStatus;
}
export {};
