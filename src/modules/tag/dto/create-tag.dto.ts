// create-tag.dto.ts
import { IsString, MaxLength } from 'class-validator';

export class CreateTagDto {
  @IsString({ message: 'Tag name must be a string' })
  @MaxLength(50, { message: 'Tag name must not exceed 50 characters' })
  name!: string;
}
