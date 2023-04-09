import { Exclude } from 'class-transformer';
import { AddressEntity } from 'src/addresses/entities/address.entity';
import { CartItemEntity } from 'src/cart-items/entities/cart-item.entity';
import { AccountType } from 'src/users/enums/account-type.enum';
import { Role } from 'src/users/enums/role.enum';
import { OrderEntity } from 'src/orders/entities/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  Index,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  emailAddress: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ default: '/default-user.jpg' })
  imageUrl: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  @Exclude()
  role: Role;

  @Column({
    type: 'enum',
    enum: AccountType,
    default: AccountType.UsingPassword,
  })
  @Exclude()
  accountType: AccountType;

  @Column({ default: true })
  @Exclude()
  isActive: boolean;

  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses: AddressEntity[];

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.user)
  cartItems: CartItemEntity[];

  @OneToMany(() => OrderEntity, (order) => order.user)
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
