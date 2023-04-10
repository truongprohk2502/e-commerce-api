import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from './entities/review.entity';
import { IJwtPayload } from 'src/common/decorators/jwt-payload.decorator';
import { CreateReviewDto } from './dto/create-review.dto';
import { CartItemsService } from 'src/cart-items/cart-items.service';
import { UsersService } from 'src/users/users.service';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PaginationDto } from 'src/common/pagination.dto';
import { getPaginateResponseData } from 'src/common/utils/getPaginateResponseData';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewsRepository: Repository<ReviewEntity>,
    private cartItemsService: CartItemsService,
    private usersService: UsersService,
  ) {}

  async getProductReviews(productId: number, paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const response = await this.reviewsRepository.findAndCount({
      where: { cartItem: { product: { id: productId } } },
      relations: ['cartItem', 'user'],
      take: limit,
      skip: (page - 1) * limit,
    });

    return getPaginateResponseData(paginationDto, ...response);
  }

  async create(createReviewDto: CreateReviewDto, payload: IJwtPayload) {
    const userId = payload.id;
    const { cartItemId, ...props } = createReviewDto;

    const cartItem = await this.cartItemsService.findOrderedByIdOrFail(
      cartItemId,
    );
    const user = await this.usersService.findByIdOrFail(userId);

    if (cartItem.user.id !== userId)
      throw new ForbiddenException('Forbidden to review');

    const review = this.reviewsRepository.create({ ...props });
    review.cartItem = cartItem;
    review.user = user;

    return this.reviewsRepository.save(review);
  }

  async update(
    id: number,
    updateReviewDto: UpdateReviewDto,
    payload: IJwtPayload,
  ) {
    const userId = payload.id;
    const { cartItemId, ...props } = updateReviewDto;

    const review = await this.reviewsRepository.preload({ id, ...props });

    if (!review) throw new NotFoundException('Review not found');

    const cartItem = await this.cartItemsService.findOrderedByIdOrFail(
      cartItemId,
    );

    if (cartItem.user.id !== userId)
      throw new ForbiddenException('Forbidden to review');

    review.cartItem = cartItem;

    return this.reviewsRepository.save(review);
  }
}
