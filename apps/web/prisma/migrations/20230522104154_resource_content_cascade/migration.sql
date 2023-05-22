-- DropForeignKey
ALTER TABLE "contents" DROP CONSTRAINT "contents_resource_id_fkey";

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;
