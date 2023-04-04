export const getPaginateSwaggerFormat = (body: any) => {
  return {
    type: 'object',
    properties: {
      meta_data: {
        type: 'object',
        properties: {
          page: {
            type: 'number',
            example: 1,
          },
          limit: {
            type: 'number',
            example: 10,
          },
          total: {
            type: 'number',
            example: 150,
          },
        },
      },
      data: body,
    },
  };
};
