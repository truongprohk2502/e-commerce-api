export const CategorySwagger = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      example: 1,
    },
    category_name: {
      type: 'string',
      example: 'Computer',
    },
    fk_parent_id: {
      type: 'number',
      example: 1,
    },
  },
};
