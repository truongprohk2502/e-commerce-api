import { ProductSwagger } from 'src/products/swaggers/product.swagger';

export const ProductItemSwagger = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      example: 1,
    },
    sku: {
      type: 'string',
      example: 'HS155',
    },
    quantityInStock: {
      type: 'number',
      example: 100,
    },
    image: {
      type: 'string',
      example: 'https://aws.image.com/my-image.jpg',
    },
    price: {
      type: 'number',
      example: 12.5,
    },
    product: ProductSwagger,
  },
};
