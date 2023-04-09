import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProductItemEntity } from './entities/product-item.entity';
import { ProductsService } from 'src/products/products.service';
import { PaginationDto } from 'src/common/pagination.dto';
import { getPaginateResponseData } from 'src/common/utils/getPaginateResponseData';
import { CreateProductItemDto } from './dto/create-product-item.dto';
import { UpdateProductItemDto } from './dto/update-product-item.dto';
import { VariationItemsService } from 'src/variation-items/variation-items.service';

@Injectable()
export class ProductItemsService {
  constructor(
    @InjectRepository(ProductItemEntity)
    private productItemsRepository: Repository<ProductItemEntity>,
    private productsService: ProductsService,
    private variationItemsService: VariationItemsService,
  ) {}

  async findByIdOrFail(id: number) {
    return this.productItemsRepository.findOneByOrFail({ id });
  }

  async findByIds(ids: number[]) {
    return Promise.all(
      ids.map((id) => this.productItemsRepository.findOneByOrFail({ id })),
    );
  }

  async getAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const response = await this.productItemsRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    return getPaginateResponseData(paginationDto, ...response);
  }

  async create(createProductItemDto: CreateProductItemDto) {
    const { productId, variationIds, ...props } = createProductItemDto;

    const product = await this.productsService.findByIdOrFail(productId);
    const variations = await this.variationItemsService.findByIds(variationIds);

    const productItem = this.productItemsRepository.create({ ...props });
    productItem.product = product;
    productItem.variations = variations;

    return this.productItemsRepository.save(productItem);
  }

  async update(id: number, updateProductItemDto: UpdateProductItemDto) {
    const { productId, variationIds, ...props } = updateProductItemDto;

    const product = await this.productsService.findByIdOrFail(productId);
    const variations = await this.variationItemsService.findByIds(variationIds);

    const productItem = await this.productItemsRepository.preload({
      id,
      ...props,
    });

    if (!productItem) throw new NotFoundException('Not found product item');
    productItem.product = product;
    productItem.variations = variations;

    return this.productItemsRepository.save(product);
  }

  async deleteById(id: number) {
    await this.productItemsRepository.softDelete(id);
  }
}
