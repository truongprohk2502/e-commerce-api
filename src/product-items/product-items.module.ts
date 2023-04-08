import { Module } from '@nestjs/common';
import { ProductItemsController } from './product-items.controller';
import { ProductItemsService } from './product-items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductItemEntity } from './entities/product-item.entity';
import { ProductsModule } from 'src/products/products.module';
import { VariationItemsModule } from 'src/variation-items/variation-items.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductItemEntity]),
    ProductsModule,
    VariationItemsModule,
  ],
  controllers: [ProductItemsController],
  providers: [ProductItemsService],
})
export class ProductItemsModule {}
