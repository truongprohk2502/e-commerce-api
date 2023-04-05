import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountryEntity } from './entities/country.entity';
import { Repository } from 'typeorm';
import { CreateCountryDto } from './dto/create-country.dto';
import { CreateCountriesDto } from './dto/create-countries.dto';
import { PaginationDto } from 'src/common/pagination.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { DeleteCountryDto } from './dto/delete-country.dto';
import { getPaginateResponseData } from 'src/common/utils/getPaginateResponseData';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(CountryEntity)
    private countriesRepository: Repository<CountryEntity>,
  ) {}

  async findById(id: number) {
    return this.countriesRepository.findOneBy({ id });
  }

  async findByIdOrFail(id: number) {
    return this.countriesRepository.findOneByOrFail({ id });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const response = await this.countriesRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    return getPaginateResponseData(paginationDto, ...response);
  }

  async create(createCountryDto: CreateCountryDto) {
    const country = this.countriesRepository.create(createCountryDto);
    return this.countriesRepository.save(country);
  }

  async createMultiple(createCountriesDto: CreateCountriesDto) {
    const countries = createCountriesDto.country_names.map((country_name) =>
      this.countriesRepository.create({ country_name }),
    );
    return this.countriesRepository.save(countries);
  }

  async update(id: number, updateCountryDto: UpdateCountryDto) {
    const country = await this.countriesRepository.preload({
      id,
      ...updateCountryDto,
    });

    if (!country) throw new BadRequestException('Country not found');

    return this.countriesRepository.save(country);
  }

  async deleteById(id: number) {
    await this.countriesRepository.delete(id);
  }

  async deleteMultiple(deleteCountryDto: DeleteCountryDto) {
    await this.countriesRepository.delete(deleteCountryDto.country_ids);
  }
}
