import { Exclude } from 'class-transformer';
import { Role } from 'src/enums/role.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  email_address: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  phone_number: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: '/default-user.jpg' })
  image_url: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  @Exclude()
  role: Role;

  @Column({ default: true })
  @Exclude()
  is_active: boolean;

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
