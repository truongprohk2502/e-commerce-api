import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreatePromotionDto {
  @IsString()
  @ApiProperty({ example: 'Black Friday' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'The super sale day' })
  description: string;

  @IsNumber()
  @ApiProperty({ example: 12.5 })
  discountRate: number;

  @IsDateString()
  @ApiProperty({ example: '2023-04-09T02:38:12.966Z' })
  startDate: Date;

  @IsDateString()
  @ApiProperty({ example: '2023-04-10T02:38:12.966Z' })
  endDate: Date;

  @IsBoolean()
  @ApiProperty({ example: true })
  isActive: boolean;
}
