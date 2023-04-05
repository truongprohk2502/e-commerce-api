import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressSwagger } from './swaggers/address.swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('addresses')
@ApiTags('addresses')
export class AddressesController {
  constructor(private addressesService: AddressesService) {}

  @Post('/')
  @Roles(Role.User)
  @ApiOperation({ summary: 'Create address' })
  @ApiCreatedResponse({
    description: 'Created successfully',
    schema: AddressSwagger,
  })
  @ApiBadRequestResponse({ description: 'Country not found' })
  async create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressesService.create(createAddressDto);
  }

  @Patch('/:id')
  @Roles(Role.User)
  @ApiOperation({ summary: 'Update address' })
  @ApiOkResponse({
    description: 'Updated successfully',
    schema: AddressSwagger,
  })
  @ApiBadRequestResponse({ description: 'Address not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressesService.update(id, updateAddressDto);
  }

  @Delete('/:id')
  @Roles(Role.User)
  @ApiOperation({ summary: 'Delete address by id' })
  @ApiOkResponse({
    description: 'Deleted successfully',
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.addressesService.deleteById(id);
  }
}
