import { Exclude } from 'class-transformer';
import { CountryEntity } from 'src/countries/entities/country.entity';
import { OrderEntity } from 'src/orders/entities/order.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('addresses')
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  unitNumber: string;

  @Column()
  streetNumber: string;

  @Column()
  streetName: string;

  @Column()
  city: string;

  @Column()
  region: string;

  @Column()
  postalCode: string;

  @Column({ default: false })
  isDefault: boolean;

  @OneToOne(() => CountryEntity, { eager: true, cascade: true })
  @JoinColumn()
  country: CountryEntity;

  @ManyToOne(() => UserEntity, (user) => user.addresses)
  @Exclude()
  user: UserEntity;

  @OneToMany(() => OrderEntity, (order) => order.address)
  orders: OrderEntity[];

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;
}
