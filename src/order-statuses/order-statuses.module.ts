import { Module } from '@nestjs/common';
import { OrderStatusesService } from './order-statuses.service';
import { OrderStatusesController } from './order-statuses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatusEntity } from './entities/order-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderStatusEntity])],
  providers: [OrderStatusesService],
  controllers: [OrderStatusesController],
})
export class OrderStatusesModule {}
