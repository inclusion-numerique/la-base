-- AlterEnum
ALTER TYPE "resource_event_type" ADD VALUE 'republished';

-- AlterTable
ALTER TABLE "resource_contributors" ALTER COLUMN "added" DROP NOT NULL;
