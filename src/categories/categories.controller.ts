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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CategorySwagger } from './swaggers/category.swagger';
import { CreateCategoryDto } from './dto/create-category';
import { NestedCategorySwagger } from './swaggers/nested-category.swagger';
import { UpdateCategoryDto } from './dto/update-category';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('categories')
@ApiTags('categories')
@Roles(Role.Admin)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create category' })
  @ApiCreatedResponse({
    description: 'Created successfully',
    schema: CategorySwagger,
  })
  @ApiBadRequestResponse({ description: 'Parent not found' })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get('/')
  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({
    description: 'Get all successfully',
    schema: {
      type: 'array',
      items: NestedCategorySwagger,
    },
  })
  async getAll() {
    return this.categoriesService.getAll();
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update category' })
  @ApiOkResponse({
    description: 'Updated successfully',
    schema: CategorySwagger,
  })
  @ApiNotFoundResponse({ description: 'Category not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete category by id' })
  @ApiOkResponse({
    description: 'Deleted successfully',
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.deleteById(id);
  }
}
