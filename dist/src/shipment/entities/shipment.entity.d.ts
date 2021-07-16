import { Parcel } from './parcel.entity';
import { User } from 'src/user/entities/user.entity';
export declare enum ShipmentStatus {
    Created = "CREATED",
    Validated = "VALIDATED",
    Canceled = "CANCELED"
}
export declare class Shipment {
    id: number;
    tracking: string;
    cost: number;
    status: ShipmentStatus;
    createdAt: Date;
    userId: number;
    user: User;
    parcels: Parcel[];
}
