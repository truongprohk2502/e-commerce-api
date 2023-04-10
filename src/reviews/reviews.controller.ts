import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRoute } from 'src/common/decorators/create-route.decorator';
import { ReviewSwagger } from './swaggers/review.swagger';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewsService } from './reviews.service';
import { UseJwtGuard } from 'src/common/decorators/jwt-guard.decorator';
import {
  IJwtPayload,
  JwtPayload,
} from 'src/common/decorators/jwt-payload.decorator';
import { UpdateRoute } from 'src/common/decorators/update-route.decorator';
import { UpdateReviewDto } from './dto/update-review.dto';
import { GetAllRoute } from 'src/common/decorators/get-all.decorator';
import { PaginationDto } from 'src/common/pagination.dto';

@Controller('reviews')
@ApiTags('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get('/product/:id')
  @GetAllRoute({
    name: 'reviews',
    paginated: true,
    schema: ReviewSwagger,
  })
  async getProductReviews(
    @Param('id', ParseIntPipe) id: number,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.reviewsService.getProductReviews(id, paginationDto);
  }

  @Post('/')
  @UseJwtGuard()
  @CreateRoute({
    name: 'review',
    regularField: 'cart item',
    forbidden: true,
    schema: ReviewSwagger,
  })
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @JwtPayload() payload: IJwtPayload,
  ) {
    return this.reviewsService.create(createReviewDto, payload);
  }

  @Put('/:id')
  @UseJwtGuard()
  @UpdateRoute({
    name: 'review',
    regularField: 'cart item',
    forbidden: true,
    schema: ReviewSwagger,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @JwtPayload() payload: IJwtPayload,
  ) {
    return this.reviewsService.update(id, updateReviewDto, payload);
  }
}
