import { Module } from '@nestjs/common';
import { VariationItemsService } from './variation-items.service';
import { VariationItemsController } from './variation-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariationItemEntity } from './entities/variation-item.entity';
import { VariationsModule } from 'src/variations/variations.module';

@Module({
  imports: [TypeOrmModule.forFeature([VariationItemEntity]), VariationsModule],
  providers: [VariationItemsService],
  controllers: [VariationItemsController],
})
export class VariationItemsModule {}
