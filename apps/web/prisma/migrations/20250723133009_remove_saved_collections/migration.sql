ALTER TABLE "saved_collection" DROP CONSTRAINT "saved_collection_base_id_fkey";

ALTER TABLE "saved_collection" DROP CONSTRAINT "saved_collection_collection_id_fkey";

ALTER TABLE "saved_collection" DROP CONSTRAINT "saved_collection_saved_by_id_fkey";

DROP TABLE "saved_collection";
