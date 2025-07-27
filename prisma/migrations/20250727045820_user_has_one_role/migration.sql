/*
  Warnings:

  - You are about to drop the column `user_rol_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserRol` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `rol_uuid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_user_rol_id_fkey";

-- DropForeignKey
ALTER TABLE "UserRol" DROP CONSTRAINT "UserRol_rol_uuid_fkey";

-- DropIndex
DROP INDEX "User_user_rol_id_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "user_rol_id",
ADD COLUMN     "rol_uuid" TEXT NOT NULL;

-- DropTable
DROP TABLE "UserRol";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_rol_uuid_fkey" FOREIGN KEY ("rol_uuid") REFERENCES "Rol"("uniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;
