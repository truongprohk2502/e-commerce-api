export const UserSwagger = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      example: 1,
    },
    email_address: {
      type: 'string',
      example: 'truong@gmail.com',
    },
    first_name: {
      type: 'string',
      example: 'truong',
    },
    last_name: {
      type: 'string',
      example: 'nguyen',
    },
    phone_number: {
      type: 'string',
      example: '07128937281',
    },
    image_url: {
      type: 'string',
      example: '/default-user.jpg',
    },
  },
};
