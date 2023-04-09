import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateCartItemDto {
  @IsInt()
  @ApiProperty({ example: 5 })
  quantity: number;

  @IsInt()
  @ApiProperty({ example: 1 })
  productId: number;
}
