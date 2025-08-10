import { CreateCourseDto } from '@/modules/courses/dto/create-course.dto';
import { UpdateCourseDto } from '@/modules/courses/dto/update-course.dto';
import { Prisma, level } from '@prisma/client';

export function mapCreateCourseDtoToPrisma(
  data: CreateCourseDto,
): Prisma.CourseCreateInput {
  return {
    name: data.name,
    description: data.description,
    title: data.title,
    level: data.level as level,
    url_image: data.urlImage ?? '',

    ...(data.categories?.length && {
      category: { connect: { uniqueID: data.categories[0] } },
    }),

    ...(data.teacherUserId && {
      teacher: { connect: { uniqueID: data.teacherUserId } },
    }),

    ...(data.tags?.length && {
      tags: { connect: data.tags.map((tagId) => ({ uniqueID: tagId })) },
    }),

    ...(data.classes?.length && {
      Classes: {
        connect: data.classes.map((classId) => ({ uniqueID: classId })),
      },
    }),

    ...(data.enrollments?.length && {
      ENROLLMENT: {
        connect: data.enrollments.map((enrollmentId) => ({
          uniqueID: enrollmentId,
        })),
      },
    }),
  } as Prisma.CourseCreateInput;
}

export function mapUpdateCourseDtoToPrisma(
  dto: UpdateCourseDto,
): Prisma.CourseUpdateInput {
  return {
    name: dto.name,
    description: dto.description,
    title: dto.title,
    level: dto.level as level,
    url_image: dto.urlImage ?? undefined,

    ...(dto.categories?.length && {
      category: { connect: { uniqueID: dto.categories[0] } },
    }),

    ...(dto.teacherUserId && {
      teacher: { connect: { uniqueID: dto.teacherUserId } },
    }),

    ...(dto.tags?.length && {
      tags: { set: dto.tags.map((tagId) => ({ uniqueID: tagId })) },
    }),

    ...(dto.classes?.length && {
      Classes: { set: dto.classes.map((classId) => ({ uniqueID: classId })) },
    }),

    ...(dto.enrollments?.length && {
      ENROLLMENT: {
        set: dto.enrollments.map((enrollmentId) => ({
          uniqueID: enrollmentId,
        })),
      },
    }),
  } as Prisma.CourseUpdateInput;
}
