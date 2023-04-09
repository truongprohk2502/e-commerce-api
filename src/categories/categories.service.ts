import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository, TreeRepository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category';
import { CATEGORIES_TREE_REPOSITORY } from './providers/categories-tree-repo.provider';
import { UpdateCategoryDto } from './dto/update-category';
import { updateEntity } from 'src/common/utils/updateEntity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoriesRepository: Repository<CategoryEntity>,
    @Inject(CATEGORIES_TREE_REPOSITORY)
    private categoriesTreeRepository: TreeRepository<CategoryEntity>,
  ) {}

  async getAll() {
    return this.categoriesTreeRepository.findTrees();
  }

  async findByIdOrFail(id: number) {
    return this.categoriesRepository.findOneByOrFail({ id });
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const { parentId } = createCategoryDto;

    const category = this.categoriesRepository.create(createCategoryDto);
    try {
      category.parent = parentId ? await this.findByIdOrFail(parentId) : null;
    } catch {
      throw new NotFoundException('Parent category not found');
    }

    return this.categoriesRepository.save(category);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const { parentId } = updateCategoryDto;

    const category = await this.categoriesRepository.findOneBy({
      id,
    });

    if (!category) throw new NotFoundException('Category not found');
    category.parent = parentId
      ? await this.categoriesRepository.findOneBy({
          id: parentId,
        })
      : null;

    updateEntity(category, updateCategoryDto);

    return this.categoriesRepository.save(category);
  }

  async deleteById(id: number) {
    await this.categoriesRepository.delete(id);
  }
}
