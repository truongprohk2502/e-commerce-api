import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { UseJwtGuard } from 'src/common/decorators/jwt-guard.decorator';
import { CreateRoute } from 'src/common/decorators/create-route.decorator';
import { OrderSwagger } from './swaggers/order.swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  IJwtPayload,
  JwtPayload,
} from 'src/common/decorators/jwt-payload.decorator';
import { GetAllRoute } from 'src/common/decorators/get-all.decorator';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/')
  @UseJwtGuard()
  @GetAllRoute({ name: 'orders', schema: OrderSwagger })
  async findAll(@JwtPayload() payload: IJwtPayload) {
    return this.ordersService.getAllByUser(payload);
  }

  @Post('/')
  @UseJwtGuard()
  @CreateRoute({
    name: 'order',
    regularField: 'address | shipping method | cart item',
    schema: OrderSwagger,
  })
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @JwtPayload() payload: IJwtPayload,
  ) {
    return this.ordersService.create(createOrderDto, payload);
  }
}
