-- AlterTable
ALTER TABLE "resources" ADD COLUMN     "deleted" TIMESTAMP(3);
-- AlterEnum
ALTER TYPE "resource_event_type" ADD VALUE 'deleted';
