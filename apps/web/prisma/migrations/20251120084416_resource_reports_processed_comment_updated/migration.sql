-- AlterEnum
ALTER TYPE "public"."user_role" ADD VALUE 'moderator';

-- AlterTable
ALTER TABLE "public"."resource_reports" ADD COLUMN     "privateComment" TEXT,
ADD COLUMN     "processed" TIMESTAMP(3),
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
