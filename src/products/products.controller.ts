import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateRoute } from 'src/common/decorators/create-route.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductSwagger } from './swaggers/product.swagger';
import { GetAllRoute } from 'src/common/decorators/get-all.decorator';
import { PaginationDto } from 'src/common/pagination.dto';
import { UpdateRoute } from 'src/common/decorators/update-route.decorator';
import { UpdateProductDto } from './dto/update-product.dto';
import { DeleteRoute } from 'src/common/decorators/delete-route.decorator';
import { GetByIdRoute } from 'src/common/decorators/get-by-id.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('products')
@ApiTags('products')
@Roles(Role.Admin)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  @GetAllRoute({ name: 'products', paginated: true, schema: ProductSwagger })
  async getAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.getAll(paginationDto);
  }

  @Get('/:id')
  @GetByIdRoute({ name: 'product', schema: ProductSwagger })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findByIdOrFail(id);
  }

  @Get('/category/:id')
  @GetAllRoute({ name: 'products', paginated: true, schema: ProductSwagger })
  async getAllByCategory(
    @Param('id') categoryId: number,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.productsService.getAllByCategory(categoryId, paginationDto);
  }

  @Post('/')
  @CreateRoute({
    name: 'product',
    regularField: 'category',
    schema: ProductSwagger,
  })
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Put('/:id')
  @UpdateRoute({
    name: 'product',
    regularField: 'category',
    schema: ProductSwagger,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete('/:id')
  @DeleteRoute({ name: 'product' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.deleteById(id);
  }
}
