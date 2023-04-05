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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CountrySwagger } from './swaggers/country.swagger';
import { CreateCountriesDto } from './dto/create-countries.dto';
import { PaginationDto } from 'src/common/pagination.dto';
import { getPaginateSwaggerFormat } from 'src/common/utils/getPaginateSwaggerFormat';
import { UpdateCountryDto } from './dto/update-country.dto';
import { DeleteCountryDto } from './dto/delete-country.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('countries')
@Roles(Role.Admin)
@ApiTags('countries')
export class CountriesController {
  constructor(private countriesService: CountriesService) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Get country by id' })
  @ApiOkResponse({
    description: 'Get country successfully',
    schema: CountrySwagger,
  })
  @ApiNotFoundResponse({
    description: 'Country not found',
  })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.countriesService.findByIdOrFail(id);
  }

  @Get('/')
  @ApiOperation({ summary: 'Get countries' })
  @ApiOkResponse({
    description: 'Get countries successfully',
    schema: getPaginateSwaggerFormat({
      type: 'array',
      items: CountrySwagger,
    }),
  })
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.countriesService.findAll(paginationDto);
  }

  @Post('/')
  @ApiOperation({ summary: 'Create a country' })
  @ApiCreatedResponse({
    description: 'Created successfully',
    schema: CountrySwagger,
  })
  @ApiBadRequestResponse({ description: 'Duplicate country' })
  async create(@Body() createCountryDto: CreateCountryDto) {
    return this.countriesService.create(createCountryDto);
  }

  @Post('/multiple')
  @ApiOperation({ summary: 'Create multiple countries' })
  @ApiCreatedResponse({
    description: 'Created successfully',
    schema: {
      type: 'array',
      items: CountrySwagger,
    },
  })
  @ApiBadRequestResponse({ description: 'Duplicate country' })
  async createMultiple(@Body() createCountriesDto: CreateCountriesDto) {
    return this.countriesService.createMultiple(createCountriesDto);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update country by id' })
  @ApiOkResponse({
    description: 'Updated successfully',
    schema: CountrySwagger,
  })
  @ApiBadRequestResponse({ description: 'Country not found' })
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCountryDto: UpdateCountryDto,
  ) {
    return this.countriesService.update(id, updateCountryDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete country by id' })
  @ApiOkResponse({
    description: 'Deleted successfully',
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.countriesService.deleteById(id);
  }

  @Delete('/')
  @ApiOperation({ summary: 'Delete countries' })
  @ApiOkResponse({
    description: 'Deleted successfully',
  })
  async deleteMultiple(@Body() deleteCountryDto: DeleteCountryDto) {
    return this.countriesService.deleteMultiple(deleteCountryDto);
  }
}
