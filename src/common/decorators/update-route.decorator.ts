import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

interface IProps {
  name: string;
  duplicated?: boolean;
  regularField?: string;
  schema: any;
}

export function UpdateRoute({
  name,
  duplicated,
  regularField,
  schema,
}: IProps) {
  const errors = [];

  duplicated &&
    errors.push(
      ApiBadRequestResponse({ description: `The ${name} is duplicated` }),
    );

  return applyDecorators(
    ApiOperation({ summary: `Update a ${name}` }),
    ApiOkResponse({
      description: `Updated ${name} successfully`,
      schema,
    }),
    ApiNotFoundResponse({
      description: regularField
        ? `The ${name} or ${regularField} not found`
        : `The ${name} not found`,
    }),
    ...errors,
  );
}
