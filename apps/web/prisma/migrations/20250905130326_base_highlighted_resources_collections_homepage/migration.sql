-- CreateEnum
CREATE TYPE "public"."highlight_resources_type" AS ENUM ('latest_published', 'most_viewed', 'most_recommended');

-- AlterTable
ALTER TABLE "public"."bases" ADD COLUMN     "highlight_collections" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "highlight_resources" "public"."highlight_resources_type" DEFAULT 'latest_published';
