import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

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

@IsString()
@IsNotEmpty()
user_id!: string;


}
