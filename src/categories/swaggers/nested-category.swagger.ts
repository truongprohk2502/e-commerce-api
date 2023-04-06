import { CategorySwagger } from './category.swagger';

export const NestedCategorySwagger = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      example: 1,
    },
    category_name: {
      type: 'string',
      example: 'Electronics',
    },
    fk_parent_id: {
      type: 'number',
      example: null,
    },
    children: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            example: 2,
          },
          category_name: {
            type: 'string',
            example: 'Computer',
          },
          fk_parent_id: {
            type: 'number',
            example: 1,
          },
          children: {
            type: 'array',
            example: [],
          },
        },
      },
    },
  },
};
