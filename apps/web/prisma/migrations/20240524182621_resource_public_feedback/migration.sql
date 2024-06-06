-- AlterEnum
ALTER TYPE "resource_event_type" ADD VALUE 'public_feedback_changed';

-- AlterTable
ALTER TABLE "resources" ADD COLUMN     "publicFeedback" BOOLEAN NOT NULL DEFAULT true;
