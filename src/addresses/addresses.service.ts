import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { CountriesService } from 'src/countries/countries.service';
import { UpdateAddressDto } from './dto/update-address.dto';
import { IJwtPayload } from 'src/common/decorators/jwt-payload.decorator';
import { updateEntity } from 'src/common/utils/updateEntity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(AddressEntity)
    private addressesRepository: Repository<AddressEntity>,
    private countriesService: CountriesService,
    private usersService: UsersService,
  ) {}

  async findById(id: number) {
    return this.addressesRepository.findOneBy({ id });
  }

  async findByIdOrFail(id: number) {
    return this.addressesRepository.findOneByOrFail({ id });
  }

  async create(createAddressDto: CreateAddressDto, payload: IJwtPayload) {
    const country = await this.countriesService.findById(
      createAddressDto.countryId,
    );
    if (!country) throw new NotFoundException('Country not found');

    const user = await this.usersService.findById(payload.id);
    if (!user) throw new NotFoundException('User not found');

    const address = this.addressesRepository.create(createAddressDto);
    address.country = country;

    address.user = user;

    return this.addressesRepository.save(address);
  }

  async update(
    id: number,
    updateAddressDto: UpdateAddressDto,
    payload: IJwtPayload,
  ) {
    const address = await this.addressesRepository.findOneBy({
      id,
      user: { id: payload.id },
    });

    if (!address) throw new NotFoundException('Address not found');

    updateEntity(address, updateAddressDto);

    return this.addressesRepository.save(address);
  }

  async deleteById(id: number) {
    await this.addressesRepository.softDelete(id);
  }
}
