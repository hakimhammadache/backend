import { Shipment } from './shipment.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Parcel {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'float',
    nullable: false,
  })
  length: number;
  @Column({
    type: 'float',
    nullable: false,
  })
  width: number;
  @Column({
    type: 'float',
    nullable: false,
  })
  height: number;
  @Column({
    type: 'float',
    nullable: false,
  })
  weight: number;
  @Column({
    type: 'float',
    nullable: false,
  })
  shipmentId: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Shipment, (shipment) => shipment.parcels)
  shipment: Shipment;
}
