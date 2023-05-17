/*
  Warnings:

  - You are about to drop the `resource_event` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "resource_event" DROP CONSTRAINT "resource_event_by_id_fkey";

-- DropForeignKey
ALTER TABLE "resource_event" DROP CONSTRAINT "resource_event_resource_id_fkey";

-- DropTable
DROP TABLE "resource_event";

-- CreateTable
CREATE TABLE "resource_events" (
    "id" UUID NOT NULL,
    "type" "ResourceEventType" NOT NULL,
    "data" JSONB NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "sequence" INTEGER NOT NULL DEFAULT 0,
    "resource_id" UUID NOT NULL,
    "by_id" UUID,

    CONSTRAINT "resource_events_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "resource_events" ADD CONSTRAINT "resource_events_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_events" ADD CONSTRAINT "resource_events_by_id_fkey" FOREIGN KEY ("by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
