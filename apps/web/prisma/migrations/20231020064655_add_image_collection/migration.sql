/*
  Warnings:

  - A unique constraint covering the columns `[image_id]` on the table `collections` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "collections" ADD COLUMN     "image_id" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "collections_image_id_key" ON "collections"("image_id");

-- AddForeignKey
ALTER TABLE "collections" ADD CONSTRAINT "collections_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;
