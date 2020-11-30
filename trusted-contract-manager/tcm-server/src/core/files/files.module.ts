import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterServiceConfig } from './config/grid-fs-multer-service.config';
import { FilesService } from './services/files.service';
import { FilesController } from './controllers/files.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        new GridFsMulterServiceConfig(configService).createMulterOptions(),
      inject: [ConfigService],
    }),
  ],
  providers: [FilesService],
  controllers: [FilesController],
  exports: [FilesService],
})
export class FilesModule {}
