import { IsEnum, IsOptional, IsString, IsUUID, Matches } from 'class-validator';
import { ServiceType } from '@prisma/client';

export class CreateSessionDto {
  @IsUUID()
  profile_id!: string;

  @IsUUID()
  availability_id!: string;

  @IsEnum(ServiceType)
  service_type!: ServiceType;

  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'scheduled_date debe ser YYYY-MM-DD' })
  scheduled_date!: string;

  @Matches(/^\d{2}:\d{2}$/, { message: 'start_time debe ser HH:MM' })
  start_time!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
