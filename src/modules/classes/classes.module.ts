// classes.module.ts
import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { MinioModule } from '@/minio/minio.module';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  imports: [MinioModule], // 👈 aquí en imports
  controllers: [ClassesController],
  providers: [ClassesService, PrismaService],
})
export class ClassesModule {}
