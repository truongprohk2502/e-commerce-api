import { applyDecorators } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

interface IProps {
  name: string;
  multiple?: boolean;
  forbidden?: boolean;
}

export function DeleteRoute({ name, multiple, forbidden }: IProps) {
  return applyDecorators(
    ApiOperation({
      summary: multiple ? `Delete multiple ${name}` : `Delete a ${name} by id`,
    }),
    ApiOkResponse({
      description: `Deleted ${name} successfully`,
    }),
    ...(forbidden
      ? [ApiForbiddenResponse({ description: 'User forbidden' })]
      : []),
  );
}
