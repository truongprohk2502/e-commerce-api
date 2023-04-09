import { Exclude } from 'class-transformer';
import { ProductItemEntity } from 'src/product-items/entities/product-item.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('cart-items')
export class CartItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => UserEntity, (user) => user.cartItems)
  @Exclude()
  user: UserEntity;

  @ManyToOne(() => ProductItemEntity, (product) => product.cartItems, {
    eager: true,
  })
  product: ProductItemEntity;

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
