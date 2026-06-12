import { DayOfWeek } from '@prisma/client';
import {
  IsEnum,
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsBoolean,
  Min,
  Matches,
} from 'class-validator';

export class CreateAvailabilityDto {
  @IsEnum(DayOfWeek)
  day_of_week!: DayOfWeek;

  @IsString()
  @Matches(/^\d{2}:\d{2}$/, { message: 'start_time debe tener formato HH:MM' })
  start_time!: string;

  @IsString()
  @Matches(/^\d{2}:\d{2}$/, { message: 'end_time debe tener formato HH:MM' })
  end_time!: string;

  @IsInt()
  @Min(15)
  slot_duration_minutes!: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsString()
  @IsNotEmpty()
  profile_id!: string;
}
