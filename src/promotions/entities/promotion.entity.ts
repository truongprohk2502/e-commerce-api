import { Exclude } from 'class-transformer';
import { ProductItemEntity } from 'src/product-items/entities/product-item.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('promotions')
export class PromotionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  discountRate: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  isActive: boolean;

  @OneToMany(() => ProductItemEntity, (productItem) => productItem.promotion)
  products: ProductItemEntity[];

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
