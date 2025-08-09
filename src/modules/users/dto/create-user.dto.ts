import { IsString, IsOptional, IsEmail, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName!: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsString()
  lastName!: string;

  @IsOptional()
  @IsString()
  secondLastName?: string;

  @IsOptional()
  @IsString()
  studentCode?: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsUUID()
  facultyId!: string;

  @IsOptional()
  @IsString()
  passwordResetId?: string;

  @IsString()
  roles!: string;
}
