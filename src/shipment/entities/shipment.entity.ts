import { Parcel } from './parcel.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum ShipmentStatus {
  Created = 'CREATED',
  Validated = 'VALIDATED',
  Canceled = 'CANCELED',
}

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'varchar',
    nullable: false,
  })
  tracking: string;
  @Column({
    type: 'float',
    nullable: false,
    default: 0,
  })
  cost: number;
  @Column({
    type: 'enum',
    enum: ShipmentStatus,
    nullable: false,
  })
  status: ShipmentStatus;

  @CreateDateColumn()
  createdAt: Date;
  @Column()
  userId: number;
  @ManyToOne(() => User)
  user: User;
  @OneToMany(() => Parcel, (parcel: Parcel) => parcel.shipment)
  parcels: Parcel[];
}
