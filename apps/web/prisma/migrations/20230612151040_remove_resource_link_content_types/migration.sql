/*
  Warnings:

  - The values [ResourceLink] on the enum `ContentType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `linked_resource_id` on the `contents` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
UPDATE "contents" SET "type" = 'Link' WHERE "type" = 'ResourceLink';

CREATE TYPE "ContentType_new" AS ENUM ('SectionTitle', 'File', 'Image', 'Link', 'Text');
ALTER TABLE "contents" ALTER COLUMN "type" TYPE "ContentType_new" USING ("type"::text::"ContentType_new");
ALTER TYPE "ContentType" RENAME TO "ContentType_old";
ALTER TYPE "ContentType_new" RENAME TO "ContentType";
DROP TYPE "ContentType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "contents" DROP CONSTRAINT "contents_linked_resource_id_fkey";

-- AlterTable
ALTER TABLE "contents" DROP COLUMN "linked_resource_id";
