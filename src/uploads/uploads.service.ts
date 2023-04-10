import { Injectable } from '@nestjs/common';
import { DeleteFileDto } from './dto/delete-file.dto';
import * as fs from 'fs';

@Injectable()
export class UploadsService {
  async save(file: Express.Multer.File) {
    return file.path.slice(6);
  }

  async delete(deleteFileDto: DeleteFileDto) {
    const { fileName } = deleteFileDto;
    fs.unlinkSync(`./public/uploads/${fileName}`);
  }
}
