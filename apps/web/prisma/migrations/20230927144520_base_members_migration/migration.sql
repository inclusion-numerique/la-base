/*
  Warnings:

  - A unique constraint covering the columns `[legacy_id]` on the table `base_members` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "base_members" ADD COLUMN     "legacy_id" INTEGER;
