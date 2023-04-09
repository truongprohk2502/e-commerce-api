import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateGoogleDto } from './dto/create-google.dto';
import { AccountType } from 'src/users/enums/account-type.enum';
import { CreateFacebookDto } from './dto/create-facebook.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string, accountType?: AccountType) {
    return this.usersRepository.findOneBy({
      emailAddress: email,
      accountType: accountType || AccountType.UsingPassword,
      isActive: true,
    });
  }

  async findById(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async findByIdOrFail(id: number) {
    return this.usersRepository.findOneByOrFail({ id });
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async createGoogle(createGoogleDto: CreateGoogleDto) {
    const user = this.usersRepository.create({
      ...createGoogleDto,
      accountType: AccountType.UsingGoogle,
    });
    return this.usersRepository.save(user);
  }

  async createFacebook(createFacebookDto: CreateFacebookDto) {
    const user = this.usersRepository.create({
      ...createFacebookDto,
      accountType: AccountType.UsingFacebook,
    });
    return this.usersRepository.save(user);
  }
}
