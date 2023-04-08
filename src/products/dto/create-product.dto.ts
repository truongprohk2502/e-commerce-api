import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @ApiProperty({ example: 'PS5' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'Play console for gammers' })
  description: string;

  @IsInt()
  @ApiProperty({ example: 1 })
  categoryId: number;
}
