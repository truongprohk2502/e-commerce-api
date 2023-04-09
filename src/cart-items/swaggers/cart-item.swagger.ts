import { ProductItemSwagger } from 'src/product-items/swaggers/product-item.swagger';

export const CartItemSwagger = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      example: 1,
    },
    quantity: {
      type: 'number',
      example: 5,
    },
    product: ProductItemSwagger,
  },
};
