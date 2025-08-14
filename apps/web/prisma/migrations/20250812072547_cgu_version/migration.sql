-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "cgu_version" TEXT,
ADD COLUMN     "last_cgu_accepted_at" TIMESTAMP(3);
