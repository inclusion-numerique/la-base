/*
  Warnings:

  - You are about to drop the column `re_published` on the `resources` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "resources" DROP COLUMN "re_published",
ADD COLUMN     "last_published" TIMESTAMP(3);

UPDATE "resources" SET "last_published" = "published";
