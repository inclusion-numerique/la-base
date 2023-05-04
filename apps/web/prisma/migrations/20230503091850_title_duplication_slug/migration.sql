-- AlterTable
ALTER TABLE "Base" ADD COLUMN "titleDuplicationCheckSlug" TEXT;
UPDATE "Base" SET "titleDuplicationCheckSlug" = slug;
alter table "Base" alter column "titleDuplicationCheckSlug" set not null;

-- AlterTable
ALTER TABLE "Resource" ADD COLUMN "titleDuplicationCheckSlug" TEXT;
UPDATE "Resource" SET "titleDuplicationCheckSlug" = slug;
alter table "Resource" alter column "titleDuplicationCheckSlug" set not null;
