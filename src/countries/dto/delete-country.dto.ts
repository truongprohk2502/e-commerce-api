import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsInt } from 'class-validator';

export class DeleteCountryDto {
  @IsInt({ each: true })
  @ArrayNotEmpty()
  @ApiProperty({ example: [1] })
  countryIds: number[];
}
