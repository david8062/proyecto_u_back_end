import { PartialType } from '@nestjs/mapped-types';
import { CreateClassesDto } from './create-classes.dto';

export class UpdateClassesDto extends PartialType(CreateClassesDto) {}
