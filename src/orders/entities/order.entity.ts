import { Exclude } from 'class-transformer';
import { AddressEntity } from 'src/addresses/entities/address.entity';
import { CartItemEntity } from 'src/cart-items/entities/cart-item.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { OrderStatus } from '../enums/order-status.enum';
import { ShippingMethodEntity } from 'src/shipping-methods/entities/shipping-method.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.Pending,
  })
  status: OrderStatus;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @ManyToOne(() => AddressEntity, (address) => address.orders)
  address: AddressEntity;

  @ManyToOne(() => ShippingMethodEntity, (method) => method.orders)
  shippingMethod: ShippingMethodEntity;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.order)
  cartItems: CartItemEntity[];

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
