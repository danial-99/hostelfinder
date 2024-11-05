/*
  Warnings:

  - The `image` column on the `Hostel` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `avatar` to the `Hostel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hostel" ADD COLUMN     "avatar" TEXT NOT NULL,
DROP COLUMN "image",
ADD COLUMN     "image" TEXT[];
