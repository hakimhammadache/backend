import { Role } from 'src/role/entities/role.entity';
import { Shipment } from 'src/shipment/entities/shipment.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    station: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    shipment: Shipment[];
    roleId: number;
    role: Role;
    setPassword(password: string): Promise<void>;
}
