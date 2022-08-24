/*
  Warnings:

  - You are about to drop the column `createdOn` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `modifiedOn` on the `User` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modifiedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdOn",
DROP COLUMN "modifiedOn",
ADD COLUMN     "createdAt" INTEGER NOT NULL,
ADD COLUMN     "modifiedAt" INTEGER NOT NULL;
