import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CreateClassesDto } from './dtos/create-classes.dto';
import { UpdateClassesDto } from './dtos/update-classes.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseInterceptor } from '@/common/interceptors/response.interceptor';

@UseInterceptors(ResponseInterceptor) // 🔹 todas las respuestas pasan por el interceptor
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  async findAll() {
    return this.classesService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const classes = await this.classesService.getById(id);
    if (!classes) {
      throw new Error('Class not found'); // el interceptor lo convierte en ErrorResponse
    }
    return classes;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createClassesDto: CreateClassesDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new Error('Video file is required');
    }
    return this.classesService.create(createClassesDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClassesDto: UpdateClassesDto,
  ) {
    const updatedClass = await this.classesService.update(id, updateClassesDto);
    if (!updatedClass) {
      throw new Error('Class not found');
    }
    return updatedClass;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.classesService.delete(id);
    return null;
  }
}
