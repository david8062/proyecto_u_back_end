import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Education } from '@prisma/client';

@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  async create(@Body() dto: CreateEducationDto): Promise<Education> {
    return this.educationService.create(dto);
  }

  @Get('profile/:profileId')
  async findByProfile(@Param('profileId') profileId: string): Promise<Education[]> {
    return this.educationService.getByProfile(profileId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Education> {
    return this.educationService.getById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateEducationDto): Promise<Education> {
    return this.educationService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.educationService.delete(id);
    return { message: `Education ${id} deleted` };
  }
}
