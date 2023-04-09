import { Module } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItemsController } from './cart-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemEntity } from './entities/cart-item.entity';
import { ProductItemsModule } from 'src/product-items/product-items.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItemEntity]),
    ProductItemsModule,
    UsersModule,
  ],
  providers: [CartItemsService],
  controllers: [CartItemsController],
  exports: [CartItemsService],
})
export class CartItemsModule {}
