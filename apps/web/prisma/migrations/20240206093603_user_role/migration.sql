-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('user', 'support', 'admin');

-- AlterTable
ALTER TABLE "users"
    ADD COLUMN "role" "user_role" NOT NULL DEFAULT 'user';
