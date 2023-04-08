import { CategorySwagger } from 'src/categories/swaggers/category.swagger';

export const ProductSwagger = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      example: 1,
    },
    name: {
      type: 'string',
      example: 'PS5',
    },
    description: {
      type: 'string',
      example: 'Play console for gammers',
    },
    category: CategorySwagger,
  },
};
