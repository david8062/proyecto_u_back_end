/*
  Warnings:

  - You are about to alter the column `description` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - You are about to alter the column `experience` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - You are about to alter the column `profile_img` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `specialization` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `web_site` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `social_networks` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `professional_certificates` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `Classes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ENROLLMENT` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CourseTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('CLASE_PERSONALIZADA', 'REVISION_TAREA', 'REVISION_PARCIAL', 'TUTORIA_PROYECTO');

-- CreateEnum
CREATE TYPE "DegreeLevel" AS ENUM ('BACHILLERATO', 'PREGRADO', 'ESPECIALIZACION', 'MAESTRIA', 'DOCTORADO');

-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- DropForeignKey
ALTER TABLE "Classes" DROP CONSTRAINT "Classes_course_id_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_teachaer_user_id_fkey";

-- DropForeignKey
ALTER TABLE "ENROLLMENT" DROP CONSTRAINT "ENROLLMENT_coursed_id_fkey";

-- DropForeignKey
ALTER TABLE "ENROLLMENT" DROP CONSTRAINT "ENROLLMENT_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_class_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_user_id_fkey";

-- DropForeignKey
ALTER TABLE "_CourseTags" DROP CONSTRAINT "_CourseTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourseTags" DROP CONSTRAINT "_CourseTags_B_fkey";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(500),
ALTER COLUMN "experience" SET DATA TYPE VARCHAR(500),
ALTER COLUMN "profile_img" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "specialization" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "web_site" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "social_networks" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "professional_certificates" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "UniversityCarrer" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- DropTable
DROP TABLE "Classes";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "ENROLLMENT";

-- DropTable
DROP TABLE "Review";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_CourseTags";

-- CreateTable
CREATE TABLE "Education" (
    "uniqueID" TEXT NOT NULL,
    "degree" "DegreeLevel" NOT NULL,
    "institution" VARCHAR(100) NOT NULL,
    "field" VARCHAR(100) NOT NULL,
    "start_year" INTEGER NOT NULL,
    "end_year" INTEGER,
    "is_current" BOOLEAN NOT NULL DEFAULT false,
    "profile_id" TEXT NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("uniqueID")
);

-- CreateTable
CREATE TABLE "TeacherSubject" (
    "uniqueID" TEXT NOT NULL,
    "level" "level" NOT NULL,
    "description" VARCHAR(255),
    "profile_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "TeacherSubject_pkey" PRIMARY KEY ("uniqueID")
);

-- CreateTable
CREATE TABLE "PricingPlan" (
    "uniqueID" TEXT NOT NULL,
    "service_type" "ServiceType" NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "description" VARCHAR(255),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "profile_id" TEXT NOT NULL,

    CONSTRAINT "PricingPlan_pkey" PRIMARY KEY ("uniqueID")
);

-- CreateTable
CREATE TABLE "Availability" (
    "uniqueID" TEXT NOT NULL,
    "day_of_week" "DayOfWeek" NOT NULL,
    "start_time" VARCHAR(5) NOT NULL,
    "end_time" VARCHAR(5) NOT NULL,
    "slot_duration_minutes" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "profile_id" TEXT NOT NULL,

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("uniqueID")
);

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("UniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherSubject" ADD CONSTRAINT "TeacherSubject_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("UniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherSubject" ADD CONSTRAINT "TeacherSubject_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("uniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PricingPlan" ADD CONSTRAINT "PricingPlan_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("UniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("UniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;
