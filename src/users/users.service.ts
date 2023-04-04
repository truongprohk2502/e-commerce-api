import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateGoogleDto } from './dto/create-google.dto';
import { AccountType } from 'src/enums/account-type.enum';
import { CreateFacebookDto } from './dto/create-facebook.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async createGoogle(createGoogleDto: CreateGoogleDto) {
    const user = this.usersRepository.create({
      ...createGoogleDto,
      account_type: AccountType.UsingGoogle,
    });
    return this.usersRepository.save(user);
  }

  async createFacebook(createFacebookDto: CreateFacebookDto) {
    const user = this.usersRepository.create({
      ...createFacebookDto,
      account_type: AccountType.UsingFacebook,
    });
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string, accountType?: AccountType) {
    return this.usersRepository.findOneBy({
      email_address: email,
      account_type: accountType || AccountType.UsingPassword,
      is_active: true,
    });
  }
}
