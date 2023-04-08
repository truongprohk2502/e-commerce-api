import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

interface IProps {
  name: string;
  schema: any;
}

export function GetByIdRoute({ name, schema }: IProps) {
  return applyDecorators(
    ApiOperation({ summary: `Get ${name} by id` }),
    ApiOkResponse({
      description: `Get ${name} successfully`,
      schema,
    }),
    ApiNotFoundResponse({
      description: `The ${name} not found`,
    }),
  );
}
