import { CartItemSwagger } from 'src/cart-items/swaggers/cart-item.swagger';
import { UserSwagger } from 'src/users/swaggers/user.swagger';

export const ReviewSwagger = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      example: 1,
    },
    rating: {
      type: 'number',
      example: 5,
    },
    comment: {
      type: 'string',
      example: 'Very good',
    },
    user: UserSwagger,
    cartItem: CartItemSwagger,
  },
};
