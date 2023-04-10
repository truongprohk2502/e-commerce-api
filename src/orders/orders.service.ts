import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { IJwtPayload } from 'src/common/decorators/jwt-payload.decorator';
import { AddressesService } from 'src/addresses/addresses.service';
import { UsersService } from 'src/users/users.service';
import { CartItemsService } from 'src/cart-items/cart-items.service';
import { ShippingMethodsService } from 'src/shipping-methods/shipping-methods.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private ordersRepository: Repository<OrderEntity>,
    private addressesService: AddressesService,
    private shippingMethodsService: ShippingMethodsService,
    private usersService: UsersService,
    private cartItemsService: CartItemsService,
  ) {}

  async getAllByUser(payload: IJwtPayload) {
    return this.ordersRepository.find({
      where: { user: { id: payload.id } },
    });
  }

  async create(createOrderDto: CreateOrderDto, payload: IJwtPayload) {
    const userId = payload.id;
    const { addressId, shippingMethodId, cartItemIds } = createOrderDto;

    const address = await this.addressesService.findByIdOrFail(addressId);
    const shippingMethod = await this.shippingMethodsService.findByIdOrFail(
      shippingMethodId,
    );
    const user = await this.usersService.findByIdOrFail(userId);
    const cartItems = await this.cartItemsService.findByIds(
      cartItemIds,
      userId,
    );

    const order = new OrderEntity();
    order.address = address;
    order.shippingMethod = shippingMethod;
    order.user = user;
    order.cartItems = cartItems;

    return this.ordersRepository.save(order);
  }
}
