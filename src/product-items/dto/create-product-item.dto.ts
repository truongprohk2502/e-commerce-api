import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString } from 'class-validator';

export class CreateProductItemDto {
  @IsString()
  @ApiProperty({ example: 'HS155' })
  sku: string;

  @IsInt()
  @ApiProperty({ example: 100 })
  quantityInStock: number;

  @IsString()
  @ApiProperty({ example: 'https://aws.image.com/my-image.jpg' })
  image: string;

  @IsNumber()
  @ApiProperty({ example: 12.5 })
  price: number;

  @IsInt()
  @ApiProperty({ example: 1 })
  productId: number;

  @IsInt({ each: true })
  @ApiProperty({ type: 'number', isArray: true, example: [1, 2] })
  variationIds: number[];
}
