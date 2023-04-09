export const PromotionSwagger = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      example: 1,
    },
    name: {
      type: 'string',
      example: 'Black Friday',
    },
    description: {
      type: 'string',
      example: 'The super sale day',
    },
    discountRate: {
      type: 'number',
      example: 12.5,
    },
    startDate: {
      type: 'string',
      example: '2023-04-09T02:38:12.966Z',
    },
    endDate: {
      type: 'string',
      example: '2023-04-10T02:38:12.966Z',
    },
    isActive: {
      type: 'boolean',
      example: true,
    },
  },
};
