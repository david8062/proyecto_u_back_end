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
import { ClassesService } from './classes.service';
import { ResponseHelper } from '@/common/helpers/response.helper';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CreateClassesDto } from './dtos/create-classes.dto';
import { UpdateClassesDto } from './dtos/update-classes.dto';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  async findAll() {
    try {
      const classes = await this.classesService.getAll();
      return ResponseHelper.success(classes, 'Classes retrieved successfully');
    } catch (error) {
      throw new HttpException(
        ResponseHelper.error('Failed to retrieve classes', {
          error: (error as Error).message,
        }),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const classes = await this.classesService.getById(id);
      if (!classes) {
        throw new HttpException(
          ResponseHelper.error('Class not found'),
          HttpStatus.NOT_FOUND,
        );
      }
      return ResponseHelper.success(classes, 'Class retrieved successfully');
    } catch (error) {
      throw new HttpException(
        ResponseHelper.error('Failed to retrieve class', {
          error: (error as Error).message,
        }),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createClassesDto: CreateClassesDto) {
    try {
      const classes = await this.classesService.create(createClassesDto);
      return ResponseHelper.success(classes, 'Class created successfully');
    } catch (error) {
      throw new HttpException(
        ResponseHelper.error('Failed to create class', {
          error: (error as Error).message,
        }),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClassesDto: UpdateClassesDto,
  ) {
    try {
      const updatedClass = await this.classesService.update(
        id,
        updateClassesDto,
      );
      if (!updatedClass) {
        throw new HttpException(
          ResponseHelper.error('Class not found'),
          HttpStatus.NOT_FOUND,
        );
      }
      return ResponseHelper.success(updatedClass, 'Class updated successfully');
    } catch (error) {
      throw new HttpException(
        ResponseHelper.error('Failed to update class', {
          error: (error as Error).message,
        }),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.classesService.delete(id);
      return ResponseHelper.success(null, 'Class deleted successfully');
    } catch (error) {
      throw new HttpException(
        ResponseHelper.error('Failed to delete class', {
          error: (error as Error).message,
        }),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
