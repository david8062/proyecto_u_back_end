-- CreateTable
CREATE TABLE "Profile" (
    "UniqueID" TEXT NOT NULL,
    "description" TEXT,
    "experience" TEXT,
    "profile_img" TEXT,
    "specialization" TEXT,
    "web_site" TEXT,
    "social_networks" TEXT,
    "professional_certificates" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("UniqueID")
);

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uniqueID") ON DELETE RESTRICT ON UPDATE CASCADE;
