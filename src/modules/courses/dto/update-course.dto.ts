import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { Level } from '@/common/enum/level.enum';
import {
  IsString,
  MaxLength,
  IsEnum,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @IsString({ message: 'Course name must be a string' })
  @MaxLength(50, { message: 'Course name must not exceed 50 characters' })
  name!: string;

  @IsString({ message: 'Course description must be a string' })
  @MaxLength(255, {
    message: 'Course description must not exceed 255 characters',
  })
  description!: string;

  @IsString({ message: 'Course title must be a string' })
  @MaxLength(15, { message: 'Course title must not exceed 15 characters' })
  title!: string;

  @IsEnum(Level, {
    message: 'Level must be one of BASIC, INTERMEDIATE or ADVANCED',
  })
  level!: Level;

  @IsOptional()
  @IsString({ message: 'URL image must be a string' })
  urlImage?: string;

  @IsArray({ message: 'Categories must be an array' })
  @ArrayNotEmpty({ message: 'At least one category is required' })
  @IsString({ each: true, message: 'Each category must be a string' })
  categories!: string[];

  @IsString({ message: 'Teacher user ID is required' })
  teacherUserId!: string;

  @IsArray({ message: 'Tags must be an array' })
  @IsString({ each: true, message: 'Each tag must be a string' })
  @IsOptional()
  tags?: string[];

  @IsArray({ message: 'Classes must be an array' })
  @IsString({ each: true, message: 'Each class must be a string' })
  @IsOptional()
  classes?: string[];

  @IsArray({ message: 'Enrollments must be an array' })
  @IsString({ each: true, message: 'Each enrollment must be a string' })
  @IsOptional()
  enrollments?: string[];
}
