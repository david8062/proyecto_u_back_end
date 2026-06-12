import { DegreeLevel } from '@prisma/client';
import {
  IsEnum,
  IsString,
  IsInt,
  IsOptional,
  IsBoolean,
  IsNotEmpty,
  Min,
  Max,
} from 'class-validator';

export class CreateEducationDto {
  @IsEnum(DegreeLevel)
  degree!: DegreeLevel;

  @IsString()
  @IsNotEmpty()
  institution!: string;

  @IsString()
  @IsNotEmpty()
  field!: string;

  @IsInt()
  @Min(1950)
  @Max(2100)
  start_year!: number;

  @IsOptional()
  @IsInt()
  @Min(1950)
  @Max(2100)
  end_year?: number;

  @IsOptional()
  @IsBoolean()
  is_current?: boolean;

  @IsString()
  @IsNotEmpty()
  profile_id!: string;
}
