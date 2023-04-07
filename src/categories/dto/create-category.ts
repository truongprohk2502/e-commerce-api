import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @ApiProperty({ example: 'Computer' })
  categoryName: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({ example: 1 })
  parentId?: number;
}
