import { TagModule } from './modules/tag/tag.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CoursesModule } from './modules/courses/courses.module';
import { ClassesModule } from './modules/classes/classes.module';
import { MinioService } from './minio/minio.service';
import { MinioModule } from './minio/minio.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { FacultyModule } from './modules/faculty/faculty.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { FacultiesModule } from './modules/faculties/faculties.module';

@Module({
  imports: [
    TagModule,
    UsersModule,
    AuthModule,
    PrismaModule,
    CoursesModule,
    ClassesModule,
    MinioModule,
    ReviewsModule,
    FacultyModule,
    CategoriesModule,
    FacultiesModule,
  ],
  providers: [MinioService],
})
export class AppModule {}
