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
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PromotionsService } from './promotions.service';
import { GetByIdRoute } from 'src/common/decorators/get-by-id.decorator';
import { PromotionSwagger } from './swaggers/promotion.swagger';
import { GetAllRoute } from 'src/common/decorators/get-all.decorator';
import { PaginationDto } from 'src/common/pagination.dto';
import { CreateRoute } from 'src/common/decorators/create-route.decorator';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdateRoute } from 'src/common/decorators/update-route.decorator';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { DeleteRoute } from 'src/common/decorators/delete-route.decorator';
import { UpdateProductsPromotionDto } from './dto/update-products-promotion.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enum';

@Controller('promotions')
@ApiTags('promotions')
@Roles(Role.Admin)
export class PromotionsController {
  constructor(private promotionsService: PromotionsService) {}

  @Get('/:id')
  @GetByIdRoute({ name: 'promotion', schema: PromotionSwagger })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.promotionsService.findByIdOrFail(id);
  }

  @Get('/')
  @GetAllRoute({
    name: 'promotions',
    paginated: true,
    schema: PromotionSwagger,
  })
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.promotionsService.findAll(paginationDto);
  }

  @Post('/')
  @CreateRoute({
    name: 'promotion',
    schema: PromotionSwagger,
  })
  async create(@Body() createPromotionDto: CreatePromotionDto) {
    return this.promotionsService.create(createPromotionDto);
  }

  @Put('/:id')
  @UpdateRoute({
    name: 'products promotion',
    schema: null,
  })
  async updateProductsPromotion(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductsPromotionDto: UpdateProductsPromotionDto,
  ) {
    return this.promotionsService.updateProductsPromotion(
      id,
      updateProductsPromotionDto,
    );
  }

  @Patch('/:id')
  @UpdateRoute({
    name: 'promotion',
    schema: PromotionSwagger,
  })
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePromotionDto: UpdatePromotionDto,
  ) {
    return this.promotionsService.update(id, updatePromotionDto);
  }

  @Delete('/:id')
  @DeleteRoute({ name: 'promotion' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.promotionsService.deleteById(id);
  }
}
