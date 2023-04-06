import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @ApiProperty({ example: 'Computer' })
  category_name: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({ example: 1 })
  fk_parent_id?: number;
}
