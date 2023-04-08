import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { getPaginateSwaggerFormat } from '../utils/getPaginateSwaggerFormat';

interface IProps {
  name: string;
  paginated?: boolean;
  schema: any;
}

export function GetAllRoute({ name, paginated, schema }: IProps) {
  return applyDecorators(
    ApiOperation({ summary: `Get all ${name}` }),
    ApiOkResponse({
      description: `Get ${name} successfully`,
      schema: paginated
        ? getPaginateSwaggerFormat(schema)
        : {
            type: 'array',
            items: schema,
          },
    }),
  );
}
