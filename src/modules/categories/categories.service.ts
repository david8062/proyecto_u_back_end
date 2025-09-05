import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Category, Prisma } from '@prisma/client';
import { IBaseService } from '@/common/base/base.service.interface';
import { CreateCategoriesDto } from './dto/categories.dto';
import { UpdateCategoriesDto } from './dto/update.dto';

@Injectable()
export class CategoriesService implements IBaseService<Category> {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  async getById(id: string | number): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: { uniqueID: String(id) },
      include: { UniversityCarrer: true },
    });
  }

  async create(data: CreateCategoriesDto): Promise<Category> {
    try {
      return this.prisma.category.create({
        data,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create category: ${error.message}`);
      }
      throw new Error('Failed to create cateory: Unknown error');
    }
  }

  async update(
    id: string | number,
    data: UpdateCategoriesDto,
  ): Promise<Category> {
    return this.prisma.category.update({
      where: { uniqueID: String(id) },
      data,
    });
  }

  async delete(id: string | number): Promise<void> {
    try {
      await this.prisma.category.delete({
        where: { uniqueID: String(id) },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Category not found');
      }
      throw error;
    }
  }
}
