import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/role/entities/role.entity';
import { Shipment } from 'src/shipment/entities/shipment.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;
  @Unique(['email'])
  @Column({
    name: 'email',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  email: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    select: false,
  })
  password: string;
  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  station: string;
  @Unique(['phoneNumber'])
  @Column({
    name: 'phoneNumber',
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  phoneNumber: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Shipment, (shipment) => shipment.id)
  shipment: Shipment[];
  @Column()
  roleId: number;
  @ManyToOne(() => Role)
  role: Role;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = 10;
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
