/*
  Warnings:

  - Changed the type of `type` on the `search_executions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "search_type" AS ENUM ('quicksearch', 'resources', 'bases', 'profiles');

-- AlterTable
ALTER TABLE "search_executions"
    ADD COLUMN "new_type" "search_type";

-- Set value of new type from type
UPDATE "search_executions"
SET "new_type" = 'quicksearch'
WHERE "type" = 'quicksearch';
UPDATE "search_executions"
SET "new_type" = 'resources'
WHERE "type" = 'resources';
UPDATE "search_executions"
SET "new_type" = 'bases'
WHERE "type" = 'bases';
UPDATE "search_executions"
SET "new_type" = 'profiles'
WHERE "type" = 'profiles';

ALTER TABLE "search_executions"
    ALTER COLUMN "new_type" SET NOT NULL;


ALTER TABLE "search_executions"
    DROP COLUMN "type";

-- Rename new_type to type

ALTER TABLE "search_executions"
    RENAME COLUMN "new_type" TO "type";

-- DropEnum
DROP TYPE "SearchType";
