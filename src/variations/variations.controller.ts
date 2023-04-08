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
import { ApiTags } from '@nestjs/swagger';
import { VariationsService } from './variations.service';
import { VariationSwagger } from './swaggers/variation.swagger';
import { CreateVariationDto } from './dto/create-variation.dto';
import { UpdateVariationDto } from './dto/update-variation.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { GetByIdRoute } from 'src/common/decorators/get-by-id.decorator';
import { GetAllRoute } from 'src/common/decorators/get-all.decorator';
import { CreateRoute } from 'src/common/decorators/create-route.decorator';
import { UpdateRoute } from 'src/common/decorators/update-route.decorator';
import { DeleteRoute } from 'src/common/decorators/delete-route.decorator';

@Controller('variations')
@ApiTags('variations')
@Roles(Role.Admin)
export class VariationsController {
  constructor(private variationsService: VariationsService) {}

  @Get('/:id')
  @GetByIdRoute({ name: 'variation', schema: VariationSwagger })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.variationsService.findByIdOrFail(id);
  }

  @Get('/')
  @GetAllRoute({ name: 'variations', schema: VariationSwagger })
  async findAll() {
    return this.variationsService.findAll();
  }

  @Post('/')
  @CreateRoute({
    name: 'variation',
    duplicated: true,
    schema: VariationSwagger,
  })
  async create(@Body() createVariationDto: CreateVariationDto) {
    return this.variationsService.create(createVariationDto);
  }

  @Put('/:id')
  @UpdateRoute({
    name: 'variation',
    duplicated: true,
    schema: VariationSwagger,
  })
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVariationDto: UpdateVariationDto,
  ) {
    return this.variationsService.update(id, updateVariationDto);
  }

  @Delete('/:id')
  @DeleteRoute({ name: 'variation' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.variationsService.deleteById(id);
  }
}
