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
import { OrderStatusesService } from './order-statuses.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { OrderStatusSwagger } from './swaggers/order-status.swagger';
import { GetByIdRoute } from 'src/common/decorators/get-by-id.decorator';
import { GetAllRoute } from 'src/common/decorators/get-all.decorator';
import { CreateRoute } from 'src/common/decorators/create-route.decorator';
import { CreateOrderStatusDto } from './dto/create-order-status.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { UpdateRoute } from 'src/common/decorators/update-route.decorator';
import { DeleteRoute } from 'src/common/decorators/delete-route.decorator';

@Controller('order-statuses')
@ApiTags('order-statuses')
@Roles(Role.Admin)
export class OrderStatusesController {
  constructor(private orderStatusesService: OrderStatusesService) {}

  @Get('/:id')
  @GetByIdRoute({ name: 'order status', schema: OrderStatusSwagger })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.orderStatusesService.findByIdOrFail(id);
  }

  @Get('/')
  @GetAllRoute({ name: 'order statuses', schema: OrderStatusSwagger })
  async findAll() {
    return this.orderStatusesService.getAll();
  }

  @Post('/')
  @CreateRoute({
    name: 'order status',
    duplicated: true,
    schema: OrderStatusSwagger,
  })
  async create(@Body() createOrderStatusDto: CreateOrderStatusDto) {
    return this.orderStatusesService.create(createOrderStatusDto);
  }

  @Put('/:id')
  @UpdateRoute({
    name: 'order status',
    duplicated: true,
    schema: OrderStatusSwagger,
  })
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.orderStatusesService.update(id, updateOrderStatusDto);
  }

  @Delete('/:id')
  @DeleteRoute({ name: 'order status' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.orderStatusesService.deleteById(id);
  }
}
