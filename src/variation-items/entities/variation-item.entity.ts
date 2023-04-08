import { Exclude } from 'class-transformer';
import { VariationEntity } from 'src/variations/entities/variation.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('variation-items')
export class VariationItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  value: string;

  @ManyToOne(() => VariationEntity, (variations) => variations.items)
  variation: VariationEntity;

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
