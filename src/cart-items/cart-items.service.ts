import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { CartItemEntity } from './entities/cart-item.entity';
import { IJwtPayload } from 'src/common/decorators/jwt-payload.decorator';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { ProductItemsService } from 'src/product-items/product-items.service';
import { UsersService } from 'src/users/users.service';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { updateEntity } from 'src/common/utils/updateEntity';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItemEntity)
    private cartItemsRepository: Repository<CartItemEntity>,
    private productItemsService: ProductItemsService,
    private usersService: UsersService,
  ) {}

  async findByIdOrFail(id: number) {
    return this.cartItemsRepository.findOneOrFail({
      where: { id },
      relations: ['user'],
    });
  }

  async findOrderedByIdOrFail(id: number) {
    return this.cartItemsRepository.findOneOrFail({
      where: { id, order: { id: Not(IsNull()) } },
      relations: ['user'],
    });
  }

  async findByIds(ids: number[], userId: number) {
    return Promise.all(
      ids.map((id) =>
        this.cartItemsRepository.findOneByOrFail({ id, user: { id: userId } }),
      ),
    );
  }

  async getAllByUser(payload: IJwtPayload) {
    return this.cartItemsRepository.find({
      where: { user: { id: payload.id }, order: { id: IsNull() } },
    });
  }

  async create(createCartItemDto: CreateCartItemDto, payload: IJwtPayload) {
    const { productId, ...props } = createCartItemDto;

    const product = await this.productItemsService.findByIdOrFail(productId);
    const user = await this.usersService.findByIdOrFail(payload.id);

    const cartItem = this.cartItemsRepository.create({ ...props });
    cartItem.product = product;
    cartItem.user = user;

    return this.cartItemsRepository.save(cartItem);
  }

  async update(
    id: number,
    updateCartItemDto: UpdateCartItemDto,
    payload: IJwtPayload,
  ) {
    const cartItem = await this.findByIdOrFail(id);

    if (cartItem.user.id !== payload.id)
      throw new ForbiddenException('Unallowed to update');

    updateEntity(cartItem, updateCartItemDto);

    return this.cartItemsRepository.save(cartItem);
  }

  async deleteById(id: number, payload: IJwtPayload) {
    const cartItem = await this.findByIdOrFail(id);

    if (cartItem.user.id !== payload.id)
      throw new ForbiddenException('Unallowed to delete');

    await this.cartItemsRepository.delete(id);
  }
}
