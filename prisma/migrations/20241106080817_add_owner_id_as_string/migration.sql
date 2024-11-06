/*
  Warnings:

  - Made the column `ownerId` on table `Hostel` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Hostel" DROP CONSTRAINT "Hostel_ownerId_fkey";

-- AlterTable
ALTER TABLE "Hostel" ALTER COLUMN "ownerId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Hostel" ADD CONSTRAINT "Hostel_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
