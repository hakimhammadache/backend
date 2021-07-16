import { Shipment } from './shipment.entity';
export declare class Parcel {
    id: number;
    length: number;
    width: number;
    height: number;
    weight: number;
    shipmentId: number;
    quantity: number;
    shipment: Shipment;
}
