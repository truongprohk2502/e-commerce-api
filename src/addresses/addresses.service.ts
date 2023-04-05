import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { CountriesService } from 'src/countries/countries.service';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(AddressEntity)
    private addressesRepository: Repository<AddressEntity>,
    private countriesService: CountriesService,
  ) {}

  async findById(id: number) {
    return this.addressesRepository.findOneBy({ id });
  }

  async findByIdOrFail(id: number) {
    return this.addressesRepository.findOneByOrFail({ id });
  }

  async create(createAddressDto: CreateAddressDto) {
    const { country_id, ...props } = createAddressDto;

    const country = await this.countriesService.findById(country_id);
    if (!country) throw new BadRequestException('Country not found');

    const address = this.addressesRepository.create({ ...props });
    address.country = country;

    return this.addressesRepository.save(address);
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    const address = await this.addressesRepository.preload({
      id,
      ...updateAddressDto,
    });

    if (!address) throw new BadRequestException('Address not found');

    return this.addressesRepository.save(address);
  }

  async deleteById(id: number) {
    await this.addressesRepository.softDelete(id);
  }
}
