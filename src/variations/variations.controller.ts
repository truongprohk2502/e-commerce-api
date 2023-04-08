import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { VariationsService } from './variations.service';
import { VariationSwagger } from './swaggers/variation.swagger';
import { CreateVariationDto } from './dto/create-variation.dto';
import { UpdateVariationDto } from './dto/update-variation.dto';

@Controller('variations')
@ApiTags('variations')
export class VariationsController {
  constructor(private variationsService: VariationsService) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Get variation by id' })
  @ApiOkResponse({
    description: 'Get variation successfully',
    schema: VariationSwagger,
  })
  @ApiNotFoundResponse({
    description: 'Variation not found',
  })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.variationsService.findByIdOrFail(id);
  }

  @Get('/')
  @ApiOperation({ summary: 'Get variations' })
  @ApiOkResponse({
    description: 'Get variations successfully',
    schema: {
      type: 'array',
      items: VariationSwagger,
    },
  })
  async findAll() {
    return this.variationsService.findAll();
  }

  @Post('/')
  @ApiOperation({ summary: 'Create a variation' })
  @ApiCreatedResponse({
    description: 'Created successfully',
    schema: VariationSwagger,
  })
  @ApiBadRequestResponse({ description: 'Duplicate country' })
  async create(@Body() createVariationDto: CreateVariationDto) {
    return this.variationsService.create(createVariationDto);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update variation by id' })
  @ApiOkResponse({
    description: 'Updated successfully',
    schema: VariationSwagger,
  })
  @ApiBadRequestResponse({ description: 'variation not found' })
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVariationDto: UpdateVariationDto,
  ) {
    return this.variationsService.update(id, updateVariationDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete country by id' })
  @ApiOkResponse({
    description: 'Deleted successfully',
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.variationsService.deleteById(id);
  }
}
