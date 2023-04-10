import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteFileDto {
  @IsString()
  @ApiProperty({ example: 'profile-1681134475410.jpg' })
  fileName: string;
}
