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
  ],
  providers: [MinioService],
})
export class AppModule {}
