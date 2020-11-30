import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import * as GridFsStorage from 'multer-gridfs-storage';
import { ConfigService } from '@nestjs/config';

export class GridFsMulterServiceConfig implements MulterOptionsFactory {
  gridFsStorage: GridFsStorage;

  constructor(private readonly configService: ConfigService) {
    this.gridFsStorage = new GridFsStorage({
      url: configService.get<string>('MONGODB_URI'),
      file: (req, file) => {
        return new Promise((resolve, _) => {
          const filename = file.originalname.trim();
          const fileInfo = {
            filename: filename,
          };
          resolve(fileInfo);
        });
      },
    });
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: this.gridFsStorage,
    };
  }
}
