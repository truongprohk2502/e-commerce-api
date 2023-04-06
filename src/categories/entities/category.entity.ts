import { Exclude } from 'class-transformer';
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
  JoinColumn,
  RelationId,
  Tree,
  TreeParent,
  TreeChildren,
} from 'typeorm';

@Entity('categories')
@Tree('nested-set')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Index({ unique: true })
  category_name: string;

  @Column({ nullable: true })
  @RelationId((categoryEntity: CategoryEntity) => categoryEntity.parent)
  fk_parent_id: number;

  @ManyToOne(() => CategoryEntity, (category) => category.children)
  @TreeParent()
  @JoinColumn({ name: 'fk_parent_id' })
  parent: CategoryEntity;

  @OneToMany(() => CategoryEntity, (category) => category.parent)
  @TreeChildren()
  children: CategoryEntity[];

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;

  @DeleteDateColumn()
  @Exclude()
  deleted_at: Date;
}
