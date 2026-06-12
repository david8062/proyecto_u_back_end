import { level } from '@prisma/client';
import { IsEnum, IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateTeacherSubjectDto {
  @IsEnum(level)
  level!: level;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty()
  profile_id!: string;

  @IsString()
  @IsNotEmpty()
  category_id!: string;
}
