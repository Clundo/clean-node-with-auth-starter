/*
  Warnings:

  - Changed the type of `createdOn` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `modifiedOn` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdOn",
ADD COLUMN     "createdOn" INTEGER NOT NULL,
DROP COLUMN "modifiedOn",
ADD COLUMN     "modifiedOn" INTEGER NOT NULL;
