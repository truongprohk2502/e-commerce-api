import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';
import { CategorySwagger } from './swaggers/category.swagger';
import { CreateCategoryDto } from './dto/create-category';
import { NestedCategorySwagger } from './swaggers/nested-category.swagger';
import { UpdateCategoryDto } from './dto/update-category';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enum';
import { CreateRoute } from 'src/common/decorators/create-route.decorator';
import { GetAllRoute } from 'src/common/decorators/get-all.decorator';
import { UpdateRoute } from 'src/common/decorators/update-route.decorator';
import { DeleteRoute } from 'src/common/decorators/delete-route.decorator';

@Controller('categories')
@ApiTags('categories')
@Roles(Role.Admin)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('/')
  @GetAllRoute({ name: 'categories', schema: NestedCategorySwagger })
  async getAll() {
    return this.categoriesService.getAll();
  }

  @Post('/')
  @CreateRoute({
    name: 'category',
    duplicated: true,
    regularField: 'parent category',
    schema: CategorySwagger,
  })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Put('/:id')
  @UpdateRoute({
    name: 'category',
    duplicated: true,
    regularField: 'parent category',
    schema: CategorySwagger,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete('/:id')
  @DeleteRoute({ name: 'category' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.deleteById(id);
  }
}
