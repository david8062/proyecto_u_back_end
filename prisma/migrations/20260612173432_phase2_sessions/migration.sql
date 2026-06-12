-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

-- CreateTable
CREATE TABLE "Session" (
    "uniqueID" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "availability_id" TEXT NOT NULL,
    "service_type" "ServiceType" NOT NULL,
    "scheduled_date" VARCHAR(10) NOT NULL,
    "start_time" VARCHAR(5) NOT NULL,
    "end_time" VARCHAR(5) NOT NULL,
    "status" "SessionStatus" NOT NULL DEFAULT 'PENDING',
    "notes" VARCHAR(500),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("uniqueID")
);

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "User"("uniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("UniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_availability_id_fkey" FOREIGN KEY ("availability_id") REFERENCES "Availability"("uniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;
