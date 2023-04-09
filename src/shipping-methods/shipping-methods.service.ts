import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { ShippingMethodEntity } from './entities/shipping-method.entity';
import { CreateShippingMethodDto } from './dto/create-shipping-method.dto';
import { UpdateShippingMethodDto } from './dto/update-shipping-method.dto';

@Injectable()
export class ShippingMethodsService {
  constructor(
    @InjectRepository(ShippingMethodEntity)
    private shippingMethodsRepository: Repository<ShippingMethodEntity>,
  ) {}

  async findByIdOrFail(id: number) {
    return this.shippingMethodsRepository.findOneByOrFail({ id });
  }

  async getAll() {
    return this.shippingMethodsRepository.find();
  }

  async create(createShippingMethodDto: CreateShippingMethodDto) {
    const deletedShippingMethod = await this.shippingMethodsRepository.findOne({
      where: { name: createShippingMethodDto.name, deletedAt: Not(IsNull()) },
      withDeleted: true,
    });

    if (deletedShippingMethod) {
      await this.shippingMethodsRepository.restore(deletedShippingMethod.id);
      return deletedShippingMethod;
    } else {
      const shippingMethod = this.shippingMethodsRepository.create(
        createShippingMethodDto,
      );
      return this.shippingMethodsRepository.save(shippingMethod);
    }
  }

  async update(id: number, updateShippingMethodDto: UpdateShippingMethodDto) {
    const shippingMethod = await this.shippingMethodsRepository.preload({
      id,
      ...updateShippingMethodDto,
    });

    if (!shippingMethod)
      throw new NotFoundException('Shipping method not found');

    return this.shippingMethodsRepository.save(shippingMethod);
  }

  async deleteById(id: number) {
    await this.shippingMethodsRepository.softDelete(id);
  }
}
