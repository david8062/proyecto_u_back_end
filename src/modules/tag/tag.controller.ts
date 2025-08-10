import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ResponseHelper } from '@/common/helpers/response.helper';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTagDto: CreateTagDto) {
    try {
      const tag = await this.tagService.create(createTagDto);
      return ResponseHelper.success(tag, 'Tag created successfully');
    } catch (error) {
      throw new HttpException(
        ResponseHelper.error('Failed to create tag', {
          error: (error as Error).message,
        }),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const tags = await this.tagService.getAll();
      return ResponseHelper.success(tags, 'Tags retrieved successfully');
    } catch (error) {
      throw new HttpException(
        ResponseHelper.error('Failed to retrieve tags', {
          error: (error as Error).message,
        }),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const tag = await this.tagService.getById(+id);
      if (!tag) {
        throw new HttpException(
          ResponseHelper.error('Tag not found'),
          HttpStatus.NOT_FOUND,
        );
      }
      return ResponseHelper.success(tag, 'Tag retrieved successfully');
    } catch (error) {
      throw new HttpException(
        ResponseHelper.error('Failed to retrieve tag', {
          error: (error as Error).message,
        }),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard) // Solo usuarios logueados pueden actualizar
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    try {
      const updatedTag = await this.tagService.update(+id, updateTagDto);
      return ResponseHelper.success(updatedTag, 'Tag updated successfully');
    } catch (error) {
      throw new HttpException(
        ResponseHelper.error('Failed to update tag', {
          error: (error as Error).message,
        }),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.tagService.delete(id);
      return ResponseHelper.success('Tag deleted successfully');
    } catch (error) {
      if ((error as Error).message === 'TAG_NOT_FOUND') {
        return ResponseHelper.error('Tag not found');
      }
      return ResponseHelper.error('Failed to delete tag', {
        error: (error as Error).message,
      });
    }
  }
}
