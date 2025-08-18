import { IBaseService } from '@/common/base/base.service.interface';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Classes } from '@prisma/client';
import { CreateClassesDto } from './dtos/create-classes.dto';
import { MinioService } from '@/minio/minio.service';

@Injectable()
export class ClassesService implements IBaseService<Classes> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly minio: MinioService,
  ) {}

  async getAll(): Promise<Classes[]> {
    return this.prisma.classes.findMany({
      include: { Review: true }, // Trae reseñas para el frontend
    });
  }

  async getById(id: string | number): Promise<Classes | null> {
    return this.prisma.classes.findUnique({
      where: { uniqueID: String(id) },
      include: { Review: true },
    });
  }

  async create(
    data: CreateClassesDto,
    file?: Express.Multer.File,
  ): Promise<Classes> {
    try {
      if (!file) {
        throw new Error('El archivo de video es obligatorio.');
      }

      const videoUrl = await this.minio.uploadFile(file);

      return await this.prisma.classes.create({
        data: {
          ...data,
          url_video: videoUrl, // siempre será string
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create class: ${error.message}`);
      }
      throw new Error('Failed to create class: Unknown error');
    }
  }

  async update(
    id: string,
    data: Partial<Classes>,
    file?: Express.Multer.File,
  ): Promise<Classes> {
    try {
      let videoUrl: string | undefined;

      if (file) {
        // Subimos el video al bucket fijo "courses"
        videoUrl = await this.minio.uploadFile(file);
      }

      return await this.prisma.classes.update({
        where: { uniqueID: id },
        data: {
          ...data,
          ...(videoUrl && { url_video: videoUrl }), // solo actualiza si hay video
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update class: ${error.message}`);
      }
      throw new Error('Failed to update class: Unknown error');
    }
  }

  async delete(id: string | number): Promise<void> {
    await this.prisma.classes.delete({
      where: { uniqueID: String(id) },
    });
  }
}
