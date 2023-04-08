import { Module } from '@nestjs/common';
import { VariationsController } from './variations.controller';
import { VariationsService } from './variations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariationEntity } from './entities/variation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VariationEntity])],
  controllers: [VariationsController],
  providers: [VariationsService],
})
export class VariationsModule {}
