import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { CountriesService } from './countries.service';
import { ApiTags } from '@nestjs/swagger';
import { CountrySwagger } from './swaggers/country.swagger';
import { CreateCountriesDto } from './dto/create-countries.dto';
import { PaginationDto } from 'src/common/pagination.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { DeleteCountryDto } from './dto/delete-country.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { GetByIdRoute } from 'src/common/decorators/get-by-id.decorator';
import { UpdateRoute } from 'src/common/decorators/update-route.decorator';
import { DeleteRoute } from 'src/common/decorators/delete-route.decorator';
import { CreateRoute } from 'src/common/decorators/create-route.decorator';
import { GetAllRoute } from 'src/common/decorators/get-all.decorator';

@Controller('countries')
@ApiTags('countries')
@Roles(Role.Admin)
export class CountriesController {
  constructor(private countriesService: CountriesService) {}

  @Get('/:id')
  @GetByIdRoute({ name: 'country', schema: CountrySwagger })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.countriesService.findByIdOrFail(id);
  }

  @Get('/')
  @GetAllRoute({ name: 'countries', paginated: true, schema: CountrySwagger })
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.countriesService.findAll(paginationDto);
  }

  @Post('/')
  @CreateRoute({ name: 'country', duplicated: true, schema: CountrySwagger })
  async create(@Body() createCountryDto: CreateCountryDto) {
    return this.countriesService.create(createCountryDto);
  }

  @Post('/multiple')
  @CreateRoute({
    name: 'countries',
    duplicated: true,
    multiple: true,
    schema: CountrySwagger,
  })
  async createMultiple(@Body() createCountriesDto: CreateCountriesDto) {
    return this.countriesService.createMultiple(createCountriesDto);
  }

  @Put('/:id')
  @UpdateRoute({ name: 'country', duplicated: true, schema: CountrySwagger })
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCountryDto: UpdateCountryDto,
  ) {
    return this.countriesService.update(id, updateCountryDto);
  }

  @Delete('/:id')
  @DeleteRoute({ name: 'country' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.countriesService.deleteById(id);
  }

  @Delete('/')
  @DeleteRoute({ name: 'countries', multiple: true })
  async deleteMultiple(@Body() deleteCountryDto: DeleteCountryDto) {
    return this.countriesService.deleteMultiple(deleteCountryDto);
  }
}
