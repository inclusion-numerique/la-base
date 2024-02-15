-- RenameColumn in "bases"
ALTER TABLE "bases" RENAME COLUMN "owner_id" TO "created_by_id";

-- RenameColumn in "collections"
ALTER TABLE "collections" RENAME COLUMN "owner_id" TO "created_by_id";

-- Drop old foreign keys (these might have already been removed if the constraints were tied to the column name)
ALTER TABLE "bases" DROP CONSTRAINT IF EXISTS "bases_owner_id_fkey";
ALTER TABLE "collections" DROP CONSTRAINT IF EXISTS "collections_owner_id_fkey";

-- Drop old indexes (these might have already been removed if the indexes were tied to the column name)
DROP INDEX IF EXISTS "bases_owner_id_idx";
DROP INDEX IF EXISTS "collections_owner_id_idx";


-- AddForeignKey with new column names
ALTER TABLE "bases" ADD CONSTRAINT "bases_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "collections" ADD CONSTRAINT "collections_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateIndex with new column names
CREATE INDEX "bases_created_by_id_idx" ON "bases"("created_by_id");
CREATE INDEX "collections_created_by_id_idx" ON "collections"("created_by_id");
