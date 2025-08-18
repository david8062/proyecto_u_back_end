import { IBaseService } from '@/common/base/base.service.interface';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Classes } from '@prisma/client';
import { CreateClassesDto } from './dtos/create-classes.dto';

@Injectable()
export class ClassesService implements IBaseService<Classes> {
  constructor(private readonly prisma: PrismaService) {}

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

  async create(data: CreateClassesDto): Promise<Classes> {
    try {
      return await this.prisma.classes.create({ data });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create class: ${error.message}`);
      }
      throw new Error('Failed to create class: Unknown error');
    }
  }

  async update(id: string, data: Partial<Classes>): Promise<Classes> {
    try {
      return await this.prisma.classes.update({
        where: { uniqueID: id },
        data,
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
