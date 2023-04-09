import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { AddressesModule } from 'src/addresses/addresses.module';
import { UsersModule } from 'src/users/users.module';
import { CartItemsModule } from 'src/cart-items/cart-items.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    AddressesModule,
    UsersModule,
    CartItemsModule,
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
