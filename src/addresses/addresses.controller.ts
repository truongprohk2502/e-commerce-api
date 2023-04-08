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
import { ApiTags } from '@nestjs/swagger';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressSwagger } from './swaggers/address.swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { UpdateAddressDto } from './dto/update-address.dto';
import {
  IJwtPayload,
  JwtPayload,
} from 'src/common/decorators/jwt-payload.decorator';
import { CreateRoute } from 'src/common/decorators/create-route.decorator';
import { UpdateRoute } from 'src/common/decorators/update-route.decorator';
import { DeleteRoute } from 'src/common/decorators/delete-route.decorator';

@Controller('addresses')
@ApiTags('addresses')
export class AddressesController {
  constructor(private addressesService: AddressesService) {}

  @Post('/')
  @Roles(Role.User)
  @CreateRoute({
    name: 'address',
    regularField: 'country',
    schema: AddressSwagger,
  })
  async create(
    @Body() createAddressDto: CreateAddressDto,
    @JwtPayload() payload: IJwtPayload,
  ) {
    return this.addressesService.create(createAddressDto, payload);
  }

  @Patch('/:id')
  @Roles(Role.User)
  @UpdateRoute({
    name: 'address',
    schema: AddressSwagger,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAddressDto: UpdateAddressDto,
    @JwtPayload() payload: IJwtPayload,
  ) {
    return this.addressesService.update(id, updateAddressDto, payload);
  }

  @Delete('/:id')
  @Roles(Role.User)
  @DeleteRoute({ name: 'address' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.addressesService.deleteById(id);
  }
}
