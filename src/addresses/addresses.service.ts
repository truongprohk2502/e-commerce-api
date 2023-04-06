import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { CountriesService } from 'src/countries/countries.service';
import { UpdateAddressDto } from './dto/update-address.dto';
import { IJwtPayload } from 'src/common/decorators/jwt-payload.decorator';
import { updateEntity } from 'src/common/utils/updateEntity';

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

  async create(createAddressDto: CreateAddressDto, payload: IJwtPayload) {
    const country = await this.countriesService.findById(
      createAddressDto.fk_country_id,
    );
    if (!country) throw new BadRequestException('Country not found');

    const address = this.addressesRepository.create(createAddressDto);
    address.country = country;
    address.fk_user_id = payload.id;

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

    if (!address) throw new BadRequestException('Address not found');

    updateEntity(address, updateAddressDto);

    return this.addressesRepository.save(address);
  }

  async deleteById(id: number) {
    await this.addressesRepository.softDelete(id);
  }
}
