import { Exclude } from 'class-transformer';
import { CountryEntity } from 'src/countries/entities/country.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('addresses')
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  unit_number: string;

  @Column()
  street_number: string;

  @Column()
  street_name: string;

  @Column()
  city: string;

  @Column()
  region: string;

  @Column()
  postal_code: string;

  @OneToOne(() => CountryEntity, { eager: true, cascade: true })
  @JoinColumn({ name: 'country_id' })
  country: CountryEntity;

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
