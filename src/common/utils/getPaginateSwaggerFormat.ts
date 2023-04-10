export const getPaginateSwaggerFormat = (schema: any) => {
  return {
    type: 'object',
    properties: {
      metaData: {
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
      data: {
        type: 'array',
        items: schema,
      },
    },
  };
};
