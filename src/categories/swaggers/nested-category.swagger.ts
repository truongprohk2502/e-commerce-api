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
          children: {
            type: 'array',
            example: [],
          },
        },
      },
    },
  },
};
