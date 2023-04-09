import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartItemsService } from './cart-items.service';
import { GetByIdRoute } from 'src/common/decorators/get-by-id.decorator';
import { CartItemSwagger } from './swaggers/cart-item.swagger';
import { GetAllRoute } from 'src/common/decorators/get-all.decorator';
import { CreateRoute } from 'src/common/decorators/create-route.decorator';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateRoute } from 'src/common/decorators/update-route.decorator';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { DeleteRoute } from 'src/common/decorators/delete-route.decorator';
import { UseJwtGuard } from 'src/common/decorators/jwt-guard.decorator';
import {
  IJwtPayload,
  JwtPayload,
} from 'src/common/decorators/jwt-payload.decorator';
import { Role } from 'src/users/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('cart-items')
@ApiTags('cart-items')
export class CartItemsController {
  constructor(private cartItemsService: CartItemsService) {}

  @Get('/:id')
  @Roles(Role.Admin)
  @GetByIdRoute({ name: 'cart item', schema: CartItemSwagger })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.cartItemsService.findByIdOrFail(id);
  }

  @Get('/')
  @UseJwtGuard()
  @GetAllRoute({ name: 'cart items', schema: CartItemSwagger })
  async findAll(@JwtPayload() payload: IJwtPayload) {
    return this.cartItemsService.getAllByUser(payload);
  }

  @Post('/')
  @UseJwtGuard()
  @CreateRoute({
    name: 'cart item',
    regularField: 'product',
    schema: CartItemSwagger,
  })
  async create(
    @Body() createCartItemDto: CreateCartItemDto,
    @JwtPayload() payload: IJwtPayload,
  ) {
    return this.cartItemsService.create(createCartItemDto, payload);
  }

  @Put('/:id')
  @UseJwtGuard()
  @UpdateRoute({
    name: 'cart item',
    forbidden: true,
    schema: CartItemSwagger,
  })
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
    @JwtPayload() payload: IJwtPayload,
  ) {
    return this.cartItemsService.update(id, updateCartItemDto, payload);
  }

  @Delete('/:id')
  @UseJwtGuard()
  @DeleteRoute({ name: 'cart item', forbidden: true })
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @JwtPayload() payload: IJwtPayload,
  ) {
    return this.cartItemsService.deleteById(id, payload);
  }
}
