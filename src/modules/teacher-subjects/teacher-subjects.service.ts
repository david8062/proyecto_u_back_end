import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { TeacherSubject } from '@prisma/client';
import { CreateTeacherSubjectDto } from './dto/create-teacher-subject.dto';
import { UpdateTeacherSubjectDto } from './dto/update-teacher-subject.dto';

@Injectable()
export class TeacherSubjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async getByProfile(profileId: string): Promise<TeacherSubject[]> {
    return this.prisma.teacherSubject.findMany({
      where: { profile_id: profileId },
      include: { category: true },
    });
  }

  async getById(id: string): Promise<TeacherSubject> {
    const item = await this.prisma.teacherSubject.findUnique({
      where: { uniqueID: id },
      include: { category: true },
    });
    if (!item) throw new NotFoundException(`TeacherSubject ${id} not found`);
    return item;
  }

  async create(data: CreateTeacherSubjectDto): Promise<TeacherSubject> {
    return this.prisma.teacherSubject.create({
      data,
      include: { category: true },
    });
  }

  async update(
    id: string,
    data: UpdateTeacherSubjectDto,
  ): Promise<TeacherSubject> {
    await this.getById(id);
    return this.prisma.teacherSubject.update({
      where: { uniqueID: id },
      data,
      include: { category: true },
    });
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    await this.prisma.teacherSubject.delete({ where: { uniqueID: id } });
  }
}
