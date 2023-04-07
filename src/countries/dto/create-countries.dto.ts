import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsString } from 'class-validator';

export class CreateCountriesDto {
  @IsString({ each: true })
  @ArrayNotEmpty()
  @ApiProperty({ type: 'string', isArray: true, example: ['Vietnam'] })
  countryNames: string[];
}
