import { AddressSwagger } from 'src/addresses/swaggers/address.swagger';
import { CartItemSwagger } from 'src/cart-items/swaggers/cart-item.swagger';

export const OrderSwagger = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      example: 1,
    },
    orderDate: {
      type: 'string',
      example: '2023-04-09T02:38:12.966Z',
    },
    status: {
      type: 'string',
      example: 'completed',
    },
    address: AddressSwagger,
    cartItems: {
      type: 'array',
      items: CartItemSwagger,
    },
  },
};
