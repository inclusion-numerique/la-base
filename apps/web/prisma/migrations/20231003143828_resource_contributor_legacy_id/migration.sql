/*
  Warnings:

  - A unique constraint covering the columns `[legacy_id]` on the table `resource_contributors` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "resource_contributors" ADD COLUMN     "legacy_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "resource_contributors_legacy_id_key" ON "resource_contributors"("legacy_id");
