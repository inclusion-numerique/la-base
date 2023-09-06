/*
  Warnings:

  - Added the required column `email` to the `bases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email_is_public` to the `bases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bases" ADD COLUMN     "base" TEXT,
ADD COLUMN     "department" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "email_is_public" BOOLEAN NOT NULL,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "twitter" TEXT,
ADD COLUMN     "website" TEXT;
