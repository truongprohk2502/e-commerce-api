import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: '82 Floor 4' })
  unit_number: string;

  @IsString()
  @ApiProperty({ example: '12A' })
  street_number: string;

  @IsString()
  @ApiProperty({ example: 'Hill Road' })
  street_name: string;

  @IsString()
  @ApiProperty({ example: 'Los Angeles' })
  city: string;

  @IsString()
  @ApiProperty({ example: 'California' })
  region: string;

  @IsString()
  @ApiProperty({ example: '880012' })
  postal_code: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: true })
  is_default: boolean;

  @IsInt()
  @ApiProperty({ example: 2 })
  country_id: number;
}
