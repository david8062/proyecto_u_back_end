import { CreateClassesDto } from '@/modules/classes/dtos/create-classes.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateReviewDto extends PartialType(CreateClassesDto) {}
