import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeacherSubjectsService } from './teacher-subjects.service';
import { CreateTeacherSubjectDto } from './dto/create-teacher-subject.dto';
import { UpdateTeacherSubjectDto } from './dto/update-teacher-subject.dto';
import { TeacherSubject } from '@prisma/client';

@Controller('teacher-subjects')
export class TeacherSubjectsController {
  constructor(private readonly teacherSubjectsService: TeacherSubjectsService) {}

  @Post()
  async create(@Body() dto: CreateTeacherSubjectDto): Promise<TeacherSubject> {
    return this.teacherSubjectsService.create(dto);
  }

  @Get('profile/:profileId')
  async findByProfile(@Param('profileId') profileId: string): Promise<TeacherSubject[]> {
    return this.teacherSubjectsService.getByProfile(profileId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TeacherSubject> {
    return this.teacherSubjectsService.getById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTeacherSubjectDto,
  ): Promise<TeacherSubject> {
    return this.teacherSubjectsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.teacherSubjectsService.delete(id);
    return { message: `TeacherSubject ${id} deleted` };
  }
}
