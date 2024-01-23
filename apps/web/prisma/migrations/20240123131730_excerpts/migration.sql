/*
  Warnings:

  - Added the required column `excerpt` to the `resources` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bases"
    ADD COLUMN "excerpt" TEXT;


-- Set excerpt as the 300 first chars AFTER having removed all html tags (POSTGRES equivalent to (description.replaceAll(/<[^>]*>?/gm, ''))
UPDATE bases
SET excerpt = substr(regexp_replace(description, '<[^>]*>?', '', 'g'), 0, 300);

-- AlterTable
ALTER TABLE "resources"
    ADD COLUMN "excerpt" TEXT;

UPDATE resources
SET excerpt = substr(description, 0, 300);

ALTER TABLE "resources"
    ALTER COLUMN "excerpt" SET NOT NULL;
