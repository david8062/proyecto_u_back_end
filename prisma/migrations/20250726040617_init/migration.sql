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
    "user_rol_id" TEXT NOT NULL,
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
CREATE TABLE "UserRol" (
    "uniqueID" TEXT NOT NULL,
    "rol_uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,

    CONSTRAINT "UserRol_pkey" PRIMARY KEY ("uniqueID")
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

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_rol_id_key" ON "User"("user_rol_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserRol_user_uuid_key" ON "UserRol"("user_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordReset_user_id_key" ON "PasswordReset"("user_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_faculty_uuid_fkey" FOREIGN KEY ("faculty_uuid") REFERENCES "Faculty"("uniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_user_rol_id_fkey" FOREIGN KEY ("user_rol_id") REFERENCES "UserRol"("uniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRol" ADD CONSTRAINT "UserRol_rol_uuid_fkey" FOREIGN KEY ("rol_uuid") REFERENCES "Rol"("uniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "Rol"("uniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordReset" ADD CONSTRAINT "PasswordReset_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoginAttemp" ADD CONSTRAINT "LoginAttemp_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoginAttemp" ADD CONSTRAINT "LoginAttemp_id_token_fkey" FOREIGN KEY ("id_token") REFERENCES "VerifyToken"("uniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;
