import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  @ApiProperty({ example: 'Vietnam' })
  country_name: string;
}
