import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

interface IProps {
  name: string;
  multiple?: boolean;
}

export function DeleteRoute({ name, multiple }: IProps) {
  return applyDecorators(
    ApiOperation({
      summary: multiple ? `Delete multiple ${name}` : `Delete a ${name} by id`,
    }),
    ApiOkResponse({
      description: `Deleted ${name} successfully`,
    }),
  );
}
