-- CreateEnum
CREATE TYPE "account_inactivity" AS ENUM ('account-deletion-soon-350d', 'account-deletion-soon-335d', 'account-deleted', 'account-inactive');

-- AlterTable
ALTER TABLE "users"
ADD COLUMN "account_inactivity" "account_inactivity";
