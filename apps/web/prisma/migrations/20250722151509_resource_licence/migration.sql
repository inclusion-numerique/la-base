-- CreateEnum
CREATE TYPE "resource_licence" AS ENUM ('etalab_2_0', 'cc_by_sa_4_0', 'cc_by_nc_sa_4_0', 'no_licence');

-- AlterEnum
ALTER TYPE "resource_event_type" ADD VALUE 'licence_changed';

-- AlterTable
ALTER TABLE "resources" ADD COLUMN     "licence" "resource_licence" DEFAULT 'etalab_2_0';

UPDATE "resources" SET "licence" = 'etalab_2_0' WHERE "licence" is null;

-- Make the column NOT NULL after setting default values
ALTER TABLE "resources" ALTER COLUMN "licence" SET NOT NULL;