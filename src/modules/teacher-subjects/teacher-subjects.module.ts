import { Module } from '@nestjs/common';
import { TeacherSubjectsService } from './teacher-subjects.service';
import { TeacherSubjectsController } from './teacher-subjects.controller';

@Module({
  controllers: [TeacherSubjectsController],
  providers: [TeacherSubjectsService],
})
export class TeacherSubjectsModule {}
