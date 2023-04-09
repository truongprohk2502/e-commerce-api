import { Module } from '@nestjs/common';
import { PromotionsController } from './promotions.controller';
import { PromotionsService } from './promotions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionEntity } from './entities/promotion.entity';
import { ProductItemsModule } from 'src/product-items/product-items.module';

@Module({
  imports: [TypeOrmModule.forFeature([PromotionEntity]), ProductItemsModule],
  controllers: [PromotionsController],
  providers: [PromotionsService],
})
export class PromotionsModule {}
