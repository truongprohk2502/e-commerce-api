import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: '82 Floor 4' })
  unitNumber: string;

  @IsString()
  @ApiProperty({ example: '12A' })
  streetNumber: string;

  @IsString()
  @ApiProperty({ example: 'Hill Road' })
  streetName: string;

  @IsString()
  @ApiProperty({ example: 'Los Angeles' })
  city: string;

  @IsString()
  @ApiProperty({ example: 'California' })
  region: string;

  @IsString()
  @ApiProperty({ example: '880012' })
  postalCode: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: true })
  isDefault?: boolean;

  @IsInt()
  @ApiProperty({ example: 1 })
  countryId: number;
}
