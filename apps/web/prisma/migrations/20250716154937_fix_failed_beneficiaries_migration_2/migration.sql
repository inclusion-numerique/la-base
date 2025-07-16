DROP INDEX IF EXISTS "resources_target_audiences_idx";
ALTER TABLE "resources" ADD COLUMN "beneficiaries" "beneficiary_tmp"[];
ALTER TABLE "resources" ADD COLUMN "professional_sectors" "professional_sector_tmp"[];
ALTER TABLE "search_executions" ADD COLUMN "beneficiaries" "beneficiary_tmp"[] DEFAULT ARRAY[]::"beneficiary_tmp"[];
ALTER TABLE "search_executions" ADD COLUMN "professional_sectors" "professional_sector_tmp"[] DEFAULT ARRAY[]::"professional_sector_tmp"[];
