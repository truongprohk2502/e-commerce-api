import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VariationEntity } from './entities/variation.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateVariationDto } from './dto/create-variation.dto';
import { UpdateVariationDto } from './dto/update-variation.dto';

@Injectable()
export class VariationsService {
  constructor(
    @InjectRepository(VariationEntity)
    private variationsRepository: Repository<VariationEntity>,
  ) {}

  async findById(id: number) {
    return this.variationsRepository.findOneBy({ id });
  }

  async findByIdOrFail(id: number) {
    return this.variationsRepository.findOneByOrFail({ id });
  }

  async getAll() {
    return this.variationsRepository.find({ relations: { items: true } });
  }

  async create(createVariationDto: CreateVariationDto) {
    const deletedVariation = await this.variationsRepository.findOne({
      where: { name: createVariationDto.name, deletedAt: Not(IsNull()) },
      withDeleted: true,
    });

    if (deletedVariation) {
      await this.variationsRepository.restore(deletedVariation.id);
      return deletedVariation;
    } else {
      const variation = this.variationsRepository.create(createVariationDto);
      return this.variationsRepository.save(variation);
    }
  }

  async update(id: number, updateVariationDto: UpdateVariationDto) {
    const variation = await this.variationsRepository.preload({
      id,
      ...updateVariationDto,
    });

    if (!variation) throw new NotFoundException('Variation not found');

    return this.variationsRepository.save(variation);
  }

  async deleteById(id: number) {
    await this.variationsRepository.softDelete(id);
  }
}
