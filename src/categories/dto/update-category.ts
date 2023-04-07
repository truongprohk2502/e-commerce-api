import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category';
import { Validate } from 'class-validator';
import { IsNullableInt } from 'src/common/validators/nullable-int.validator';

export class UpdateCategoryDto extends PickType(CreateCategoryDto, [
  'categoryName',
]) {
  @Validate(IsNullableInt)
  @ApiProperty({ example: 1 })
  parentId: number | null;
}
