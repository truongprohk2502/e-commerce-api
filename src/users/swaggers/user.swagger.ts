export const UserSwagger = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      example: 1,
    },
    emailAddress: {
      type: 'string',
      example: 'truong@gmail.com',
    },
    firstName: {
      type: 'string',
      example: 'truong',
    },
    lastName: {
      type: 'string',
      example: 'nguyen',
    },
    phoneNumber: {
      type: 'string',
      example: '07128937281',
    },
    imageUrl: {
      type: 'string',
      example: '/default-user.jpg',
    },
  },
};
