import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UploadFileDto } from './dto/upload-file.dto';
import { UploadsService } from './uploads.service';
import { DeleteFileDto } from './dto/delete-file.dto';
import { DeleteRoute } from 'src/common/decorators/delete-route.decorator';

@Controller('uploads')
@ApiTags('uploads')
export class UploadsController {
  constructor(private uploadsService: UploadsService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload file',
    type: UploadFileDto,
  })
  @ApiCreatedResponse({
    description: 'Uploaded successfully',
    schema: {
      type: 'string',
      example: '\\uploads\\profile-1681133074764.jpg',
    },
  })
  @ApiBadRequestResponse({ description: 'Not image file' })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadsService.save(file);
  }

  @Delete('/')
  @DeleteRoute({ name: 'file' })
  async delete(@Body() deleteFileDto: DeleteFileDto) {
    return this.uploadsService.delete(deleteFileDto);
  }
}
