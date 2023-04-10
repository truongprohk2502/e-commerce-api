import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      limits: {
        files: 1,
        fileSize: 10 * 1024 * 1024,
      },
      fileFilter(req, file, callback) {
        return ['image/jpeg', 'image/png', 'image/gif'].includes(file.mimetype)
          ? callback(null, true)
          : callback(new Error('Only images are allowed'), false);
      },
      storage: diskStorage({
        destination: './public/uploads',
        filename(req, file, callback) {
          const filename = file.originalname;
          const ext = filename.split('.').pop();
          const name = filename.slice(0, filename.length - ext.length - 1);
          callback(null, `${name}-${Date.now()}.${ext}`);
        },
      }),
    }),
  ],
  controllers: [UploadsController],
  providers: [UploadsService],
  exports: [UploadsService],
})
export class UploadsModule {}
