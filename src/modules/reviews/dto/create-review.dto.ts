import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateReviewDto {
  @IsOptional()
  @IsUUID()
  uniqueID?: string;

  @IsString({ message: 'Review must be a string' })
  review!: string;

  @IsInt({ message: 'The rating must be an integer number' })
  rating!: number;

  @IsString({ message: 'User ID must be a string' })
  user_id!: string;

  @IsString({ message: 'Class ID must be a string' })
  class_id!: string;
}
