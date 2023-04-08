export const VariationSwagger = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      example: 1,
    },
    name: {
      type: 'string',
      example: 'Size',
    },
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            example: 1,
          },
          value: {
            type: 'string',
            example: 'XXL',
          },
        },
      },
    },
  },
};
