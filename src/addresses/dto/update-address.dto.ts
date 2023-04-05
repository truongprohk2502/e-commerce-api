import { CreateAddressDto } from './create-address.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: true })
  is_default?: boolean;
}
