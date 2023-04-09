import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { OrderStatusEntity } from './entities/order-status.entity';
import { CreateOrderStatusDto } from './dto/create-order-status.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrderStatusesService {
  constructor(
    @InjectRepository(OrderStatusEntity)
    private orderStatusesRepository: Repository<OrderStatusEntity>,
  ) {}

  async findByIdOrFail(id: number) {
    return this.orderStatusesRepository.findOneByOrFail({ id });
  }

  async getAll() {
    return this.orderStatusesRepository.find();
  }

  async create(createOrderStatusDto: CreateOrderStatusDto) {
    const deletedOrderStatus = await this.orderStatusesRepository.findOne({
      where: { status: createOrderStatusDto.status, deletedAt: Not(IsNull()) },
      withDeleted: true,
    });

    if (deletedOrderStatus) {
      await this.orderStatusesRepository.restore(deletedOrderStatus.id);
      return deletedOrderStatus;
    } else {
      const orderStatus =
        this.orderStatusesRepository.create(createOrderStatusDto);
      return this.orderStatusesRepository.save(orderStatus);
    }
  }

  async update(id: number, updateOrderStatusDto: UpdateOrderStatusDto) {
    const orderStatus = await this.orderStatusesRepository.preload({
      id,
      ...updateOrderStatusDto,
    });

    if (!orderStatus) throw new NotFoundException('Order status not found');

    return this.orderStatusesRepository.save(orderStatus);
  }

  async deleteById(id: number) {
    await this.orderStatusesRepository.softDelete(id);
  }
}
