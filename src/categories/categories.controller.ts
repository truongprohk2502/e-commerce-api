import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CategorySwagger } from './swaggers/category.swagger';
import { CreateCategoryDto } from './dto/create-category';
import { NestedCategorySwagger } from './swaggers/nested-category.swagger';

@Controller('categories')
@ApiTags('categories')
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
}
