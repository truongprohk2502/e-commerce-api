import { Injectable } from '@nestjs/common';
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
    const userId = payload.id;

    const country = await this.countriesService.findByIdOrFail(
      createAddressDto.countryId,
    );
    const user = await this.usersService.findByIdOrFail(userId);

    const { isDefault } = createAddressDto;
    if (isDefault) {
      const defaultAddress = await this.addressesRepository.findOneBy({
        user: { id: userId },
        isDefault: true,
      });
      if (defaultAddress) {
        defaultAddress.isDefault = false;
        await this.addressesRepository.save(defaultAddress);
      }
    }

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
    const userId = payload.id;
    const address = await this.addressesRepository.findOneByOrFail({
      id,
      user: { id: userId },
    });

    const { isDefault } = updateAddressDto;
    if (isDefault) {
      const defaultAddress = await this.addressesRepository.findOneBy({
        user: { id: userId },
        isDefault: true,
      });
      if (defaultAddress) {
        defaultAddress.isDefault = false;
        await this.addressesRepository.save(defaultAddress);
      }
    }

    updateEntity(address, updateAddressDto);

    return this.addressesRepository.save(address);
  }

  async deleteById(id: number) {
    await this.addressesRepository.softDelete(id);
  }
}
