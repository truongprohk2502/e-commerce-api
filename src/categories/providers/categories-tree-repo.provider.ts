import { DataSource } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';

export const CATEGORIES_TREE_REPOSITORY = 'CATEGORIES_TREE_REPOSITORY';

export const CategoriesTreeProvider = {
  provide: CATEGORIES_TREE_REPOSITORY,
  useFactory: (dataSource: DataSource) =>
    dataSource.manager.getTreeRepository(CategoryEntity),
  inject: [DataSource],
};
