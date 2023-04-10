import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @ApiProperty({ example: 1 })
  cartItemId: number;

  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({ example: 5 })
  rating: number;

  @IsString()
  @ApiProperty({ example: 'Very good' })
  comment: string;
}
