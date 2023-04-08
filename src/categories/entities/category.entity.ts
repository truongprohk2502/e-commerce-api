import { Exclude } from 'class-transformer';
import { ProductEntity } from 'src/products/entities/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  Index,
  Tree,
  TreeParent,
  TreeChildren,
  OneToMany,
} from 'typeorm';

@Entity('categories')
@Tree('closure-table')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  categoryName: string;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];

  @TreeParent()
  @Exclude()
  parent: CategoryEntity;

  @TreeChildren()
  children: CategoryEntity[];

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
