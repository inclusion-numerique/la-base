/*
  Warnings:

  - You are about to drop the column `accessCount` on the `shareable_link` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."shareable_link" DROP COLUMN "accessCount",
ADD COLUMN     "access_count" INTEGER NOT NULL DEFAULT 0;
