-- cleanup of previous migration and temp tables
DROP TABLE IF EXISTS target_to_beneficiary;
DROP TABLE IF EXISTS target_to_professional_sector;
ALTER TABLE "search_executions" ALTER COLUMN "beneficiaries" DROP DEFAULT;
ALTER TABLE "search_executions" ALTER COLUMN "professional_sectors" DROP DEFAULT;

ALTER TABLE "resources"
    ALTER COLUMN "beneficiaries" TYPE "beneficiary"[]
        USING "beneficiaries"::text[]::"beneficiary"[];

ALTER TABLE "resources"
    ALTER COLUMN "professional_sectors" TYPE "professional_sector"[]
        USING "professional_sectors"::text[]::"professional_sector"[];

ALTER TABLE "search_executions"
    ALTER COLUMN "beneficiaries" TYPE "beneficiary"[]
        USING "beneficiaries"::text[]::"beneficiary"[];

ALTER TABLE "search_executions"
    ALTER COLUMN "professional_sectors" TYPE "professional_sector"[]
        USING "professional_sectors"::text[]::"professional_sector"[];

ALTER TABLE "search_executions"
    ALTER COLUMN "beneficiaries" SET DEFAULT ARRAY[]::"beneficiary"[];

ALTER TABLE "search_executions"
    ALTER COLUMN "professional_sectors" SET DEFAULT ARRAY[]::"professional_sector"[];

ALTER TABLE "resources" DROP COLUMN IF EXISTS "target_audiences";
ALTER TABLE "search_executions" DROP COLUMN IF EXISTS "target_audiences";
DROP TYPE IF EXISTS "target_audience";
DROP TYPE "beneficiary_tmp";
DROP TYPE "professional_sector_tmp";

CREATE INDEX "resources_beneficiaries_idx" ON "resources" USING GIN ("beneficiaries");
CREATE INDEX "resources_professional_sectors_idx" ON "resources" USING GIN ("professional_sectors");
