import { Module } from '@nestjs/common';
import { ShippingMethodsService } from './shipping-methods.service';
import { ShippingMethodsController } from './shipping-methods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingMethodEntity } from './entities/shipping-method.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingMethodEntity])],
  providers: [ShippingMethodsService],
  controllers: [ShippingMethodsController],
  exports: [ShippingMethodsService],
})
export class ShippingMethodsModule {}
