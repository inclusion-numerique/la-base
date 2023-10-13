/*
  Warnings:

  - A unique constraint covering the columns `[cover_image_id]` on the table `bases` will be added. If there are existing duplicate values, this will fail.

*/

-- AlterTable
ALTER TABLE "bases"
ADD COLUMN     "cover_image_id" UUID;


-- CreateIndex
CREATE UNIQUE INDEX "bases_cover_image_id_key" ON "bases"("cover_image_id");

-- AddForeignKey
ALTER TABLE "bases" ADD CONSTRAINT "bases_cover_image_id_fkey" FOREIGN KEY ("cover_image_id") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;
