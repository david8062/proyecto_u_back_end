import { Injectable } from '@nestjs/common';
import { Tag } from '@prisma/client';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { IBaseService } from '@/common/base/base.service.interface';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class TagService implements IBaseService<Tag> {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Tag[]> {
    return this.prisma.tag.findMany();
  }

  async getById(id: string | number): Promise<Tag | null> {
    return this.prisma.tag.findUnique({
      where: { uniqueID: String(id) },
    });
  }

  async create(data: CreateTagDto): Promise<Tag> {
    try {
      return this.prisma.tag.create({
        data,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create tag: ${error.message}`);
      }
      throw new Error('Failed to create tag: Unknown error');
    }
  }

  async update(id: string | number, data: UpdateTagDto): Promise<Tag> {
    return this.prisma.tag.update({
      where: { uniqueID: String(id) },
      data,
    });
  }

  async delete(id: string | number): Promise<void> {
    await this.prisma.tag.delete({
      where: { uniqueID: String(id) },
    });
  }
}
