import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository, TreeRepository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category';
import { CATEGORIES_TREE_REPOSITORY } from './providers/categories-tree-repo.provider';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoriesRepository: Repository<CategoryEntity>,
    @Inject(CATEGORIES_TREE_REPOSITORY)
    private categoriesTreeRepository: TreeRepository<CategoryEntity>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { fk_parent_id } = createCategoryDto;
    if (fk_parent_id) {
      await this.categoriesRepository.findOneByOrFail({
        id: fk_parent_id,
      });
    }
    const category = this.categoriesRepository.create(createCategoryDto);
    return this.categoriesRepository.save(category);
  }

  async getAll() {
    return this.categoriesTreeRepository.findTrees();
  }
}
