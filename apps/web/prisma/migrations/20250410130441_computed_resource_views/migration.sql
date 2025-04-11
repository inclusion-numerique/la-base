-- AlterTable
ALTER TABLE "resources" ADD COLUMN     "last_view" TIMESTAMP(3),
ADD COLUMN     "views_count" INTEGER NOT NULL DEFAULT 0;
