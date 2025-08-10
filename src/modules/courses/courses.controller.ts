import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ResponseHelper } from '@/common/helpers/response.helper';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    try {
      const course = await this.coursesService.create(createCourseDto);
      return ResponseHelper.success(course, 'Course created successfully');
    } catch (error) {
      throw new HttpException(
        ResponseHelper.error('Failed to create course', {
          error: (error as Error).message,
        }),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const courses = await this.coursesService.getAll();
      return ResponseHelper.success(courses, 'Courses retrieved successfully');
    } catch (error) {
      throw new HttpException(
        ResponseHelper.error('Failed to retrieve courses', {
          error: (error as Error).message,
        }),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const course = await this.coursesService.getById(+id);
      if (!course) {
        throw new HttpException(
          ResponseHelper.error('Course not found'),
          HttpStatus.NOT_FOUND,
        );
      }
      return ResponseHelper.success(course, 'Course retrieved successfully');
    } catch (error) {
      throw new HttpException(
        ResponseHelper.error('Failed to retrieve course', {
          error: (error as Error).message,
        }),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    try {
      const updatedCourse = await this.coursesService.update(
        id,
        updateCourseDto,
      );
      if (!updatedCourse) {
        throw new HttpException(
          ResponseHelper.error('Course not found'),
          HttpStatus.NOT_FOUND,
        );
      }
      return ResponseHelper.success(
        updatedCourse,
        'Course updated successfully',
      );
    } catch (error) {
      throw new HttpException(
        ResponseHelper.error('Failed to update course', {
          error: (error as Error).message,
        }),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard) // Solo usuarios logueados pueden eliminar
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.coursesService.delete(+id);
      return ResponseHelper.success(null, 'Course deleted successfully');
    } catch (error) {
      return ResponseHelper.error('Failed to delete course', {
        error: (error as Error).message,
      });
    }
  }
}
