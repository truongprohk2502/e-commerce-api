import { Exclude } from 'class-transformer';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { ProductItemEntity } from 'src/product-items/entities/product-item.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  Index,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    eager: true,
  })
  category: CategoryEntity;

  @OneToMany(() => ProductItemEntity, (productItem) => productItem.product)
  items: ProductItemEntity[];

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
