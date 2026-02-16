-- AlterTable
ALTER TABLE "collection_resources" ADD COLUMN     "shareable_link_id" UUID;

-- AddForeignKey
ALTER TABLE "collection_resources" ADD CONSTRAINT "collection_resources_shareable_link_id_fkey" FOREIGN KEY ("shareable_link_id") REFERENCES "shareable_link"("id") ON DELETE SET NULL ON UPDATE CASCADE;
