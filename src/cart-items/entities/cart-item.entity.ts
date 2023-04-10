import { Exclude } from 'class-transformer';
import { OrderEntity } from 'src/orders/entities/order.entity';
import { ProductItemEntity } from 'src/product-items/entities/product-item.entity';
import { ReviewEntity } from 'src/reviews/entities/review.entity';
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

  @ManyToOne(() => OrderEntity, (order) => order.cartItems)
  order: OrderEntity;

  @OneToMany(() => ReviewEntity, (review) => review.cartItem)
  reviews: ReviewEntity[];

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
