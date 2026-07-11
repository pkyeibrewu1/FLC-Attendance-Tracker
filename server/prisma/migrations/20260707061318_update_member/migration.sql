/*
  Warnings:

  - You are about to drop the column `dob` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Member` table. All the data in the column will be lost.
  - Added the required column `dateOfBirth` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "dob",
DROP COLUMN "phone",
ADD COLUMN     "dateOfBirth" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;
