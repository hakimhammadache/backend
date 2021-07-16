import { CreateParcelDto } from './create-parcel.dto';
export declare class CreateshipmentDto {
    id?: number;
    tracking: string;
    parcels: CreateParcelDto[];
}
