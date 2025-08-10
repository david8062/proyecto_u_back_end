import { PartialType } from '@nestjs/mapped-types';
import { CreateTagDto } from './create-tag.dto';
import { IsString, MaxLength } from 'class-validator';

export class UpdateTagDto extends PartialType(CreateTagDto) {
  @IsString({ message: 'Tag name must be a string' })
  @MaxLength(50, { message: 'Tag name must not exceed 50 characters' })
  name!: string;
}
