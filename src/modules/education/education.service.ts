import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Education } from '@prisma/client';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Injectable()
export class EducationService {
  constructor(private readonly prisma: PrismaService) {}

  async getByProfile(profileId: string): Promise<Education[]> {
    return this.prisma.education.findMany({ where: { profile_id: profileId } });
  }

  async getById(id: string): Promise<Education> {
    const item = await this.prisma.education.findUnique({ where: { uniqueID: id } });
    if (!item) throw new NotFoundException(`Education ${id} not found`);
    return item;
  }

  async create(data: CreateEducationDto): Promise<Education> {
    return this.prisma.education.create({ data });
  }

  async update(id: string, data: UpdateEducationDto): Promise<Education> {
    await this.getById(id);
    return this.prisma.education.update({ where: { uniqueID: id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    await this.prisma.education.delete({ where: { uniqueID: id } });
  }
}
