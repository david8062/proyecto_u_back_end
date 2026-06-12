import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MinioModule } from './minio/minio.module';
import { MinioService } from './minio/minio.service';
import { FacultiesModule } from './modules/faculties/faculties.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { EducationModule } from './modules/education/education.module';
import { TeacherSubjectsModule } from './modules/teacher-subjects/teacher-subjects.module';
import { PricingPlansModule } from './modules/pricing-plans/pricing-plans.module';
import { AvailabilityModule } from './modules/availability/availability.module';
import { RolesModule } from './modules/roles/roles.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PrismaModule,
    MinioModule,
    FacultiesModule,
    CategoriesModule,
    ProfilesModule,
    EducationModule,
    TeacherSubjectsModule,
    PricingPlansModule,
    AvailabilityModule,
    RolesModule,
  ],
  providers: [MinioService],
})
export class AppModule {}
