-- CreateEnum
CREATE TYPE "deleted_reason" AS ENUM ('suspicious_auto');
-- AlterTable
ALTER TABLE "users"
ADD COLUMN "deleted_reason" "deleted_reason";