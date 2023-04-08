import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VariationItemsService } from './variation-items.service';
import { CreateRoute } from 'src/common/decorators/create-route.decorator';
import { CreateVariationItemDto } from './dto/create-variation-item.dto';
import { VariationItemSwagger } from './swaggers/variation-item.swagger';
import { GetByIdRoute } from 'src/common/decorators/get-by-id.decorator';
import { DeleteRoute } from 'src/common/decorators/delete-route.decorator';
import { UpdateRoute } from 'src/common/decorators/update-route.decorator';
import { UpdateVariationItemDto } from './dto/update-variation-item.dto';

@Controller('variation-items')
@ApiTags('variation-items')
export class VariationItemsController {
  constructor(private variationItemsService: VariationItemsService) {}

  @Get('/:id')
  @GetByIdRoute({ name: 'variation item', schema: VariationItemSwagger })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.variationItemsService.findByIdOrFail(id);
  }

  @Post('/')
  @CreateRoute({
    name: 'variation item',
    duplicated: true,
    schema: VariationItemSwagger,
  })
  async create(@Body() createVariationItemDto: CreateVariationItemDto) {
    return this.variationItemsService.create(createVariationItemDto);
  }

  @Put('/:id')
  @UpdateRoute({
    name: 'variation item',
    duplicated: true,
    schema: VariationItemSwagger,
  })
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVariationItemDto: UpdateVariationItemDto,
  ) {
    return this.variationItemsService.update(id, updateVariationItemDto);
  }

  @Delete('/:id')
  @DeleteRoute({ name: 'variation item' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.variationItemsService.deleteById(id);
  }
}
