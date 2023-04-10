import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';

interface IProps {
  name: string;
  duplicated?: boolean;
  multiple?: boolean;
  forbidden?: boolean;
  regularField?: string;
  schema: any;
}

export function CreateRoute({
  name,
  duplicated,
  multiple,
  forbidden,
  regularField,
  schema,
}: IProps) {
  const errors = [];

  duplicated &&
    errors.push(ApiBadRequestResponse({ description: `Duplicate ${name}` }));
  regularField &&
    errors.push(
      ApiNotFoundResponse({ description: `The ${regularField} not found` }),
    );
  forbidden &&
    errors.push(ApiForbiddenResponse({ description: 'User forbidden' }));

  return applyDecorators(
    ApiOperation({
      summary: multiple ? `Create multiple ${name}` : `Create a ${name}`,
    }),
    ApiCreatedResponse({
      description: `Created ${name} successfully`,
      schema: multiple
        ? {
            type: 'array',
            items: schema,
          }
        : schema,
    }),
    ...errors,
  );
}
