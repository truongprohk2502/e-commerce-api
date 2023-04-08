import { VariationSwagger } from 'src/variations/swaggers/variation.swagger';

export const VariationItemSwagger = {
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
    variation: VariationSwagger,
  },
};
