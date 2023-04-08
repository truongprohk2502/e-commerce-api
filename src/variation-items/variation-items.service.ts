import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VariationItemEntity } from './entities/variation-item.entity';
import { Repository } from 'typeorm';
import { CreateVariationItemDto } from './dto/create-variation-item.dto';
import { VariationsService } from 'src/variations/variations.service';
import { UpdateVariationItemDto } from './dto/update-variation-item.dto';

@Injectable()
export class VariationItemsService {
  constructor(
    @InjectRepository(VariationItemEntity)
    private variationItemsRepository: Repository<VariationItemEntity>,
    private variationsService: VariationsService,
  ) {}

  async findByIdOrFail(id: number) {
    try {
      const variationItem = await this.variationItemsRepository.findOneByOrFail(
        { id },
      );
      return variationItem;
    } catch {
      throw new NotFoundException('Variation item not found');
    }
  }

  async create(createVariationItemDto: CreateVariationItemDto) {
    const { variationId, value } = createVariationItemDto;

    const variation = await this.variationsService.findByIdOrFail(variationId);

    const deletedVariationItem = await this.variationItemsRepository.findOne({
      where: { value },
      withDeleted: true,
    });

    if (deletedVariationItem) {
      await this.variationItemsRepository.restore(deletedVariationItem.id);
      deletedVariationItem.variation = variation;
      deletedVariationItem.deletedAt = null;

      return this.variationItemsRepository.save(deletedVariationItem);
    } else {
      const variationItem = this.variationItemsRepository.create({
        value,
      });
      variationItem.variation = variation;

      return this.variationItemsRepository.save(variationItem);
    }
  }

  async update(id: number, updateVariationItemDto: UpdateVariationItemDto) {
    const { variationId, ...props } = updateVariationItemDto;

    const variation = await this.variationsService.findById(variationId);

    if (!variation) throw new NotFoundException('Variation not found');

    const variationItem = await this.variationItemsRepository.preload({
      id,
      ...props,
    });

    if (!variationItem) throw new NotFoundException('Variation item not found');

    variationItem.variation = variation;

    return this.variationItemsRepository.save(variationItem);
  }

  async deleteById(id: number) {
    await this.variationItemsRepository.softDelete(id);
  }
}
