import { Exclude } from 'class-transformer';
import { CountryEntity } from 'src/countries/entities/country.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  RelationId,
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

  @Column()
  @RelationId((addressEntity: AddressEntity) => addressEntity.country)
  fk_country_id: number;

  @OneToOne(() => CountryEntity, { eager: true, cascade: true })
  @JoinColumn({ name: 'fk_country_id' })
  country: CountryEntity;

  @Column()
  @RelationId((addressEntity: AddressEntity) => addressEntity.user)
  fk_user_id: number;

  @ManyToOne(() => UserEntity, (user) => user.addresses)
  @JoinColumn({ name: 'fk_user_id' })
  @Exclude()
  user: UserEntity;

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
