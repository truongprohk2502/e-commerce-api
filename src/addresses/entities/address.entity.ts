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
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('addresses')
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  unitNumber: string;

  @Column()
  streetNumber: string;

  @Column()
  streetName: string;

  @Column()
  city: string;

  @Column()
  region: string;

  @Column()
  postalCode: string;

  @OneToOne(() => CountryEntity, { eager: true, cascade: true })
  @JoinColumn()
  country: CountryEntity;

  @ManyToOne(() => UserEntity, (user) => user.addresses)
  @Exclude()
  user: UserEntity;

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
