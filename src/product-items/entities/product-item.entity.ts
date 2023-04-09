import { Exclude } from 'class-transformer';
import { ProductEntity } from 'src/products/entities/product.entity';
import { PromotionEntity } from 'src/promotions/entities/promotion.entity';
import { VariationItemEntity } from 'src/variation-items/entities/variation-item.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('product-items')
export class ProductItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sku: string;

  @Column()
  quantityInStock: number;

  @Column()
  image: string;

  @Column()
  price: number;

  @ManyToOne(() => ProductEntity, (product) => product.items, { eager: true })
  product: ProductEntity;

  @ManyToOne(() => PromotionEntity, (promotion) => promotion.products, {
    eager: true,
  })
  promotion: PromotionEntity;

  @ManyToMany(() => VariationItemEntity, { eager: true })
  @JoinTable()
  variations: VariationItemEntity[];

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
