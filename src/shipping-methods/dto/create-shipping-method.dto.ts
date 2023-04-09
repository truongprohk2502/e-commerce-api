import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateShippingMethodDto {
  @IsString()
  @ApiProperty({ example: 'In-day' })
  name: string;

  @IsNumber()
  @ApiProperty({ example: 12.5 })
  price: number;
}
