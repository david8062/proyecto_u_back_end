import { IsString, IsOptional, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateProfileDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  experience?: string;

  @IsOptional()
  @IsString()
  profile_img?: string;

  @IsOptional()
  @IsString()
  specialization?: string;

  @IsOptional()
  @IsString()
  web_site?: string;

  @IsOptional()
  @IsString()
  social_networks?: string;

  @IsOptional()
  @IsString()
  professional_certificates?: string;

  @IsOptional()
  @IsBoolean()
  is_verified?: boolean;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsString()
  @IsNotEmpty()
  user_id!: string;
}
