-- CreateEnum
CREATE TYPE "HostelStatus" AS ENUM ('APPROVED', 'DISAPPROVED', 'PENDING');

-- AlterTable
ALTER TABLE "Hostel" ADD COLUMN "status" "HostelStatus" NOT NULL DEFAULT 'PENDING';
