import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

interface IProps {
  name: string;
  duplicated?: boolean;
  forbidden?: boolean;
  regularField?: string;
  schema: any;
}

export function UpdateRoute({
  name,
  duplicated,
  forbidden,
  regularField,
  schema,
}: IProps) {
  const errors = [];

  duplicated &&
    errors.push(
      ApiBadRequestResponse({ description: `The ${name} is duplicated` }),
    );
  forbidden &&
    errors.push(ApiForbiddenResponse({ description: 'User forbidden' }));

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
