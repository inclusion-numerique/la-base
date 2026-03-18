-- AlterTable
ALTER TABLE "resources" ADD COLUMN "last_contributed_by_id" UUID;

-- CreateIndex
CREATE INDEX "resources_last_contributed_by_id_idx" ON "resources"("last_contributed_by_id");

-- AddForeignKey
ALTER TABLE "resources" ADD CONSTRAINT "resources_last_contributed_by_id_fkey" FOREIGN KEY ("last_contributed_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Backfill from resource_events
UPDATE resources SET last_contributed_by_id = sub.by_id
FROM (
  SELECT DISTINCT ON (resource_id) resource_id, by_id
  FROM resource_events
  WHERE by_id IS NOT NULL
  ORDER BY resource_id, timestamp DESC, sequence DESC
) sub
WHERE resources.id = sub.resource_id;

-- Fallback to creator for resources without events
UPDATE resources
SET last_contributed_by_id = created_by_id
WHERE last_contributed_by_id IS NULL;
