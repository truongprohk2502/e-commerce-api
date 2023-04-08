import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Query,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductItemsService } from './product-items.service';
import { GetAllRoute } from 'src/common/decorators/get-all.decorator';
import { ProductItemSwagger } from './swaggers/product-item.swagger';
import { PaginationDto } from 'src/common/pagination.dto';
import { GetByIdRoute } from 'src/common/decorators/get-by-id.decorator';
import { CreateRoute } from 'src/common/decorators/create-route.decorator';
import { CreateProductItemDto } from './dto/create-product-item.dto';
import { UpdateRoute } from 'src/common/decorators/update-route.decorator';
import { UpdateProductItemDto } from './dto/update-product-item.dto';
import { DeleteRoute } from 'src/common/decorators/delete-route.decorator';

@Controller('product-items')
@ApiTags('product-items')
export class ProductItemsController {
  constructor(private productItemsService: ProductItemsService) {}

  @Get('/')
  @GetAllRoute({
    name: 'product items',
    paginated: true,
    schema: ProductItemSwagger,
  })
  async getAll(@Query() paginationDto: PaginationDto) {
    return this.productItemsService.getAll(paginationDto);
  }

  @Get('/:id')
  @GetByIdRoute({ name: 'product item', schema: ProductItemSwagger })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.productItemsService.findByIdOrFail(id);
  }

  @Post('/')
  @CreateRoute({
    name: 'product item',
    regularField: 'product',
    schema: ProductItemSwagger,
  })
  async create(@Body() createProductItemDto: CreateProductItemDto) {
    return this.productItemsService.create(createProductItemDto);
  }

  @Patch('/:id')
  @UpdateRoute({
    name: 'product',
    regularField: 'product',
    schema: ProductItemSwagger,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductItemDto: UpdateProductItemDto,
  ) {
    return this.productItemsService.update(id, updateProductItemDto);
  }

  @Delete('/:id')
  @DeleteRoute({ name: 'product' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.productItemsService.deleteById(id);
  }
}
