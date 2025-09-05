import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from '@prisma/client';
import { IBaseService } from '@/common/base/base.service.interface';
import { PrismaService } from '@/prisma/prisma.service';
import {
  mapCreateCourseDtoToPrisma,
  mapUpdateCourseDtoToPrisma,
} from '@/common/helpers/prisma-mapper.helper';
@Injectable()
export class CoursesService implements IBaseService<Course> {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Course[]> {
    return this.prisma.course.findMany({
      include: { teacher: true },
    });
  }

  async getById(id: string | number): Promise<Course | null> {
    return this.prisma.course.findUnique({
      where: { uniqueID: String(id) },
      include: { teacher: true },
    });
  }

  async create(data: CreateCourseDto): Promise<Course> {
    try {
      const prismaData = mapCreateCourseDtoToPrisma(data);
      return await this.prisma.course.create({ data: prismaData });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create course: ${error.message}`);
      }
      throw new Error('Failed to create course: Unknown error');
    }
  }

  async update(id: string, data: UpdateCourseDto): Promise<Course> {
    try {
      const prismaData = mapUpdateCourseDtoToPrisma(data);
      return await this.prisma.course.update({
        where: { uniqueID: id },
        data: prismaData,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update course: ${error.message}`);
      }
      throw new Error('Failed to update course: Unknown error');
    }
  }

  async delete(id: string | number): Promise<void> {
    await this.prisma.course.delete({
      where: { uniqueID: String(id) },
    });
  }
}
