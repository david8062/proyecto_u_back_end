import { IsString, MaxLength, IsOptional, IsUUID } from 'class-validator';

export class CreateClassesDto {
  @IsOptional() // Prisma genera UUID automáticamente
  @IsUUID()
  uniqueID?: string;

  @IsString({ message: 'Class description must be a string' })
  @MaxLength(255, { message: 'Description must not exceed 255 characters' })
  description!: string;

  @IsString({ message: 'Class title must be a string' })
  @MaxLength(25, { message: 'Title must not exceed 25 characters' })
  title!: string;

  @IsString({ message: 'Video URL must be a string' })
  @MaxLength(255, { message: 'URL must not exceed 255 characters' })
  url_video!: string;

  @IsString({ message: 'Course ID is required' })
  course_id!: string;

  // @IsOptional()
  // Review?: unknown[]; // ⚠️ aquí normalmente pondrías CreateReviewDto[], no string[]
}
