import { IsString, IsOptional, IsEmail, IsUUID } from 'class-validator';
export class CreateFacultieDto {
  @IsString()
  faculty_name!: string;
}
