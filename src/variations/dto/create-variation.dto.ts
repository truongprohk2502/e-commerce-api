import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateVariationDto {
  @IsString()
  @ApiProperty({ example: 'Size' })
  name: string;
}
