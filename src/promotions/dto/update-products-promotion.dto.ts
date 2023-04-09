import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class UpdateProductsPromotionDto {
  @IsInt({ each: true })
  @ApiProperty({ type: 'number', isArray: true, example: [1, 2] })
  productIds: number[];
}
