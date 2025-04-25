-- AlterTable
ALTER TABLE "users" ADD COLUMN     "signed_up_at" TIMESTAMP(3);

-- Update all users to set the signed_up_at to the created
UPDATE "users" SET "signed_up_at" = "created";
