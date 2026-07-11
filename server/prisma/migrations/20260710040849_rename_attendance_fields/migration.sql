/*
  Warnings:

  - You are about to drop the column `Status` on the `Attendance` table. All the data in the column will be lost.
  - Added the required column `firstTimer` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "Status",
ADD COLUMN     "firstTimer" TEXT NOT NULL;
