-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_faculty_uuid_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "faculty_uuid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_faculty_uuid_fkey" FOREIGN KEY ("faculty_uuid") REFERENCES "Faculty"("uniqueID") ON DELETE SET NULL ON UPDATE CASCADE;
