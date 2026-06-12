import { ServiceType } from '@prisma/client';
import {
  IsEnum,
  IsString,
  IsOptional,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';

export class CreatePricingPlanDto {
  @IsEnum(ServiceType)
  service_type!: ServiceType;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price!: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsString()
  @IsNotEmpty()
  profile_id!: string;
}
