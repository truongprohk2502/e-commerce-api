import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ShippingMethodsService } from './shipping-methods.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ShippingMethodSwagger } from './swaggers/shipping-method.swagger';
import { GetByIdRoute } from 'src/common/decorators/get-by-id.decorator';
import { GetAllRoute } from 'src/common/decorators/get-all.decorator';
import { CreateRoute } from 'src/common/decorators/create-route.decorator';
import { CreateShippingMethodDto } from './dto/create-shipping-method.dto';
import { UpdateShippingMethodDto } from './dto/update-shipping-method.dto';
import { UpdateRoute } from 'src/common/decorators/update-route.decorator';
import { DeleteRoute } from 'src/common/decorators/delete-route.decorator';

@Controller('shipping-methods')
@ApiTags('shipping-methods')
export class ShippingMethodsController {
  constructor(private shippingMethodsService: ShippingMethodsService) {}

  @Get('/:id')
  @GetByIdRoute({ name: 'shipping method', schema: ShippingMethodSwagger })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.shippingMethodsService.findByIdOrFail(id);
  }

  @Get('/')
  @GetAllRoute({ name: 'shipping methods', schema: ShippingMethodSwagger })
  async findAll() {
    return this.shippingMethodsService.getAll();
  }

  @Post('/')
  @Roles(Role.Admin)
  @CreateRoute({
    name: 'shipping method',
    duplicated: true,
    schema: ShippingMethodSwagger,
  })
  async create(@Body() createShippingMethodDto: CreateShippingMethodDto) {
    return this.shippingMethodsService.create(createShippingMethodDto);
  }

  @Put('/:id')
  @Roles(Role.Admin)
  @UpdateRoute({
    name: 'shipping method',
    duplicated: true,
    schema: ShippingMethodSwagger,
  })
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShippingMethodDto: UpdateShippingMethodDto,
  ) {
    return this.shippingMethodsService.update(id, updateShippingMethodDto);
  }

  @Delete('/:id')
  @Roles(Role.Admin)
  @DeleteRoute({ name: 'shipping method' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.shippingMethodsService.deleteById(id);
  }
}
