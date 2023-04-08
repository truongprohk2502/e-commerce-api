import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { CategoriesService } from 'src/categories/categories.service';
import { PaginationDto } from 'src/common/pagination.dto';
import { getPaginateResponseData } from 'src/common/utils/getPaginateResponseData';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productsRepository: Repository<ProductEntity>,
    private categoriesService: CategoriesService,
  ) {}

  async findByIdOrFail(id: number) {
    try {
      const product = await this.productsRepository.findOneByOrFail({ id });
      return product;
    } catch {
      throw new NotFoundException('Product not found');
    }
  }

  async getAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const response = await this.productsRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    return getPaginateResponseData(paginationDto, ...response);
  }

  async getAllByCategory(categoryId: number, paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const response = await this.productsRepository.findAndCount({
      where: { category: { id: categoryId } },
      take: limit,
      skip: (page - 1) * limit,
    });

    return getPaginateResponseData(paginationDto, ...response);
  }

  async create(createProductDto: CreateProductDto) {
    const { categoryId, ...props } = createProductDto;

    const category = await this.categoriesService.findByIdOrFail(categoryId);

    const product = this.productsRepository.create({ ...props });
    product.category = category;

    return this.productsRepository.save(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { categoryId, ...props } = updateProductDto;

    const category = await this.categoriesService.findByIdOrFail(categoryId);
    const product = await this.productsRepository.preload({ id, ...props });
    if (!product) throw new NotFoundException('Not found product');
    product.category = category;

    return this.productsRepository.save(product);
  }

  async deleteById(id: number) {
    await this.productsRepository.softDelete(id);
  }
}
