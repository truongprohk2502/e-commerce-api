import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateVariationItemDto {
  @IsString()
  @ApiProperty({ example: 'XXL' })
  value: string;

  @IsInt()
  @ApiProperty({ example: 1 })
  variationId: number;
}
