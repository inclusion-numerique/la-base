/*
  Warnings:

  - A unique constraint covering the columns `[usurper_id]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "usurper_id" UUID;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_fixture" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "timezone" TEXT NOT NULL DEFAULT 'Europe/Paris';

-- CreateIndex
CREATE UNIQUE INDEX "sessions_usurper_id_key" ON "sessions"("usurper_id");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_usurper_id_fkey" FOREIGN KEY ("usurper_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
