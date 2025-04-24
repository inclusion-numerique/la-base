/*
  Warnings:

  - A unique constraint covering the columns `[featuredBlockId]` on the table `bases` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[featuredBlockId]` on the table `resources` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[featuredBlockId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "featured_block_type" AS ENUM ('base', 'resource', 'profile');

-- AlterTable
ALTER TABLE "bases" ADD COLUMN     "featuredBlockId" UUID;

-- AlterTable
ALTER TABLE "resources" ADD COLUMN     "featuredBlockId" UUID;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "featuredBlockId" UUID;

-- CreateTable
CREATE TABLE "featured_blocks" (
    "id" UUID NOT NULL,
    "type" "featured_block_type" NOT NULL,
    "baseId" UUID,
    "resourceId" UUID,
    "profileId" UUID,

    CONSTRAINT "featured_blocks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "featured_blocks_baseId_key" ON "featured_blocks"("baseId");

-- CreateIndex
CREATE UNIQUE INDEX "featured_blocks_resourceId_key" ON "featured_blocks"("resourceId");

-- CreateIndex
CREATE UNIQUE INDEX "featured_blocks_profileId_key" ON "featured_blocks"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "bases_featuredBlockId_key" ON "bases"("featuredBlockId");

-- CreateIndex
CREATE UNIQUE INDEX "resources_featuredBlockId_key" ON "resources"("featuredBlockId");

-- CreateIndex
CREATE UNIQUE INDEX "users_featuredBlockId_key" ON "users"("featuredBlockId");

-- AddForeignKey
ALTER TABLE "featured_blocks" ADD CONSTRAINT "featured_blocks_baseId_fkey" FOREIGN KEY ("baseId") REFERENCES "bases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "featured_blocks" ADD CONSTRAINT "featured_blocks_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "resources"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "featured_blocks" ADD CONSTRAINT "featured_blocks_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
