import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromotionEntity } from './entities/promotion.entity';
import { PaginationDto } from 'src/common/pagination.dto';
import { getPaginateResponseData } from 'src/common/utils/getPaginateResponseData';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { UpdateProductsPromotionDto } from './dto/update-products-promotion.dto';
import { ProductItemsService } from 'src/product-items/product-items.service';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(PromotionEntity)
    private promotionsRepository: Repository<PromotionEntity>,
    private productItemsService: ProductItemsService,
  ) {}

  async findByIdOrFail(id: number) {
    return this.promotionsRepository.findOneByOrFail({ id });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const response = await this.promotionsRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    return getPaginateResponseData(paginationDto, ...response);
  }

  async create(createPromotionDto: CreatePromotionDto) {
    const promotion = this.promotionsRepository.create(createPromotionDto);
    return this.promotionsRepository.save(promotion);
  }

  async updateProductsPromotion(
    id: number,
    updateProductsPromotionDto: UpdateProductsPromotionDto,
  ) {
    const products = await this.productItemsService.findByIds(
      updateProductsPromotionDto.productIds,
    );

    const promotion = await this.promotionsRepository.findOneByOrFail({ id });
    promotion.products = products;

    return this.promotionsRepository.save(promotion);
  }

  async update(id: number, updatePromotionDto: UpdatePromotionDto) {
    const promotion = await this.promotionsRepository.preload({
      id,
      ...updatePromotionDto,
    });

    if (!promotion) throw new NotFoundException('Promotion not found');

    return this.promotionsRepository.save(promotion);
  }

  async deleteById(id: number) {
    await this.promotionsRepository.softDelete(id);
  }
}
