/*
  Warnings:

  - Made the column `excerpt` on table `bases` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "base_members" ADD COLUMN     "invited_by_id" UUID;

-- CreateIndex
CREATE INDEX "base_members_invited_by_id_idx" ON "base_members"("invited_by_id");

-- AddForeignKey
ALTER TABLE "base_members" ADD CONSTRAINT "base_members_invited_by_id_fkey" FOREIGN KEY ("invited_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
