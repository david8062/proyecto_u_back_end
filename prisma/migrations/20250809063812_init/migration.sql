-- CreateEnum
CREATE TYPE "level" AS ENUM ('BASIC', 'INTERMEDIATE', 'ADVANCED');

-- CreateTable
CREATE TABLE "User" (
    "uniqueID" TEXT NOT NULL,
    "primer_nombre" VARCHAR(70) NOT NULL,
    "segundo_nombre" VARCHAR(70),
    "primer_apellido" VARCHAR(70) NOT NULL,
    "segundo_apellido" VARCHAR(70) NOT NULL,
    "cod_estudiante" VARCHAR(20),
    "email" VARCHAR(70) NOT NULL,
    "has_password" VARCHAR(256) NOT NULL,
    "faculty_uuid" TEXT NOT NULL,
    "rol_uuid" TEXT NOT NULL,
    "id_password_reset" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uniqueID")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "uniqueID" TEXT NOT NULL,
    "faculty_name" VARCHAR(30) NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("uniqueID")
);

-- CreateTable
CREATE TABLE "Rol" (
    "uniqueID" TEXT NOT NULL,
    "name_rol" VARCHAR(10) NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("uniqueID")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "uuid" TEXT NOT NULL,
    "view_permission" VARCHAR(10) NOT NULL,
    "action_permission" VARCHAR(10) NOT NULL,
    "rol_id" TEXT NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "PasswordReset" (
    "uniqueID" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "old_password" TEXT NOT NULL,
    "new_password" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "PasswordReset_pkey" PRIMARY KEY ("uniqueID")
);

-- CreateTable
CREATE TABLE "VerifyToken" (
    "uniqueID" TEXT NOT NULL,
    "token" VARCHAR(50) NOT NULL,
    "otp" VARCHAR(6) NOT NULL,

    CONSTRAINT "VerifyToken_pkey" PRIMARY KEY ("uniqueID")
);

-- CreateTable
CREATE TABLE "LoginAttemp" (
    "unique_ID" TEXT NOT NULL,
    "ip" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "login_acces" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "id_token" TEXT NOT NULL,

    CONSTRAINT "LoginAttemp_pkey" PRIMARY KEY ("unique_ID")
);

-- CreateTable
CREATE TABLE "UniversityCarrer" (
    "uniqueID" TEXT NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "faculty_id" TEXT NOT NULL,

    CONSTRAINT "UniversityCarrer_pkey" PRIMARY KEY ("uniqueID")
);

-- CreateTable
CREATE TABLE "Category" (
    "uniqueID" TEXT NOT NULL,
    "name" VARCHAR(10) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "universityCarrerID" TEXT NOT NULL,
    "facultyID" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("uniqueID")
);

-- CreateTable
CREATE TABLE "Tag" (
    "uniqueID" TEXT NOT NULL,
    "name" VARCHAR(10) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("uniqueID")
);

-- CreateTable
CREATE TABLE "Course" (
    "uniqueID" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "title" VARCHAR(15) NOT NULL,
    "level" "level" NOT NULL DEFAULT 'BASIC',
    "url_image" VARCHAR(255) NOT NULL,
    "category_id" TEXT NOT NULL,
    "teachaer_user_id" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("uniqueID")
);

-- CreateTable
CREATE TABLE "Review" (
    "uniqueID" TEXT NOT NULL,
    "review" VARCHAR(255) NOT NULL,
    "rating" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "class_id" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("uniqueID")
);

-- CreateTable
CREATE TABLE "Classes" (
    "uniqueID" TEXT NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "title" VARCHAR(25) NOT NULL,
    "url_video" VARCHAR(255) NOT NULL,
    "course_id" TEXT NOT NULL,

    CONSTRAINT "Classes_pkey" PRIMARY KEY ("uniqueID")
);

-- CreateTable
CREATE TABLE "ENROLLMENT" (
    "uniqueID" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "coursed_id" TEXT NOT NULL,

    CONSTRAINT "ENROLLMENT_pkey" PRIMARY KEY ("uniqueID")
);

-- CreateTable
CREATE TABLE "_CourseTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CourseTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordReset_user_id_key" ON "PasswordReset"("user_id");

-- CreateIndex
CREATE INDEX "_CourseTags_B_index" ON "_CourseTags"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_faculty_uuid_fkey" FOREIGN KEY ("faculty_uuid") REFERENCES "Faculty"("uniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_rol_uuid_fkey" FOREIGN KEY ("rol_uuid") REFERENCES "Rol"("uniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "Rol"("uniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordReset" ADD CONSTRAINT "PasswordReset_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoginAttemp" ADD CONSTRAINT "LoginAttemp_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoginAttemp" ADD CONSTRAINT "LoginAttemp_id_token_fkey" FOREIGN KEY ("id_token") REFERENCES "VerifyToken"("uniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniversityCarrer" ADD CONSTRAINT "UniversityCarrer_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "Faculty"("uniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_universityCarrerID_fkey" FOREIGN KEY ("universityCarrerID") REFERENCES "UniversityCarrer"("uniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_facultyID_fkey" FOREIGN KEY ("facultyID") REFERENCES "Faculty"("uniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("uniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_teachaer_user_id_fkey" FOREIGN KEY ("teachaer_user_id") REFERENCES "User"("uniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Classes"("uniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classes" ADD CONSTRAINT "Classes_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("uniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ENROLLMENT" ADD CONSTRAINT "ENROLLMENT_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ENROLLMENT" ADD CONSTRAINT "ENROLLMENT_coursed_id_fkey" FOREIGN KEY ("coursed_id") REFERENCES "Course"("uniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseTags" ADD CONSTRAINT "_CourseTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("uniqueID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseTags" ADD CONSTRAINT "_CourseTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("uniqueID") ON DELETE CASCADE ON UPDATE CASCADE;
