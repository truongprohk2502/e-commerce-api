import { ApiProperty } from '@nestjs/swagger';
import { IsInt, ArrayNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  @ApiProperty({ example: 1 })
  addressId: number;

  @IsInt()
  @ApiProperty({ example: 1 })
  shippingMethodId: number;

  @IsInt({ each: true })
  @ArrayNotEmpty()
  @ApiProperty({ type: 'number', isArray: true, example: [1, 2] })
  cartItemIds: number[];
}
