
BEGIN;
DROP INDEX IF EXISTS "resources_target_audiences_idx";
ALTER TABLE "resources" ADD COLUMN "beneficiaries" "beneficiary_tmp"[];
ALTER TABLE "resources" ADD COLUMN "professional_sectors" "professional_sector_tmp"[];
ALTER TABLE "search_executions" ADD COLUMN "beneficiaries" "beneficiary_tmp"[] DEFAULT ARRAY[]::"beneficiary_tmp"[];
ALTER TABLE "search_executions" ADD COLUMN "professional_sectors" "professional_sector_tmp"[] DEFAULT ARRAY[]::"professional_sector_tmp"[];
COMMIT;

CREATE TEMP TABLE target_to_beneficiary (
                                            target target_audience,
                                            beneficiary beneficiary_tmp
);

CREATE TEMP TABLE target_to_professional_sector (
                                                    target target_audience,
                                                    professional_sector professional_sector_tmp
);

INSERT INTO target_to_beneficiary (target, beneficiary) VALUES
                                                            ('tous_publics', 'tous_publics'),
                                                            ('jeunes_enfants_6', 'enfants_mineurs'),
                                                            ('enfants_6_12', 'enfants_mineurs'),
                                                            ('adolescents_12_18', 'enfants_mineurs'),
                                                            ('jeunes_adultes_18_25', 'enfants_mineurs'),
                                                            ('adultes', 'adultes'),
                                                            ('seniors_personnes_agees', 'seniors_personnes_agees'),
                                                            ('parents', 'parents'),
                                                            ('personnes_tres_eloignees_numerique', 'personnes_tres_eloignees_numerique'),
                                                            ('personne_situation_handicap', 'personne_situation_handicap_ou_perte_autonomie'),
                                                            ('personnes_perte_autonomie', 'personne_situation_handicap_ou_perte_autonomie'),
                                                            ('personne_situation_illetrisme', 'personne_situation_illetrisme'),
                                                            ('personne_allophone', 'personne_allophone_ou_refugies_demandeurs_asile'),
                                                            ('refugies_demandeurs_asile', 'personne_allophone_ou_refugies_demandeurs_asile'),
                                                            ('personnes_insertion_professionnelle', 'personnes_en_insertion_sociale_ou_professionnelle'),
                                                            ('personnes_en_insertion_sociale', 'personnes_en_insertion_sociale_ou_professionnelle'),
                                                            ('particuliers', 'tous_publics');

INSERT INTO target_to_professional_sector (target, professional_sector) VALUES
                                                                            ('mediateurs_numeriques', 'aidants_et_mediateurs_numeriques'),
                                                                            ('aidants_numeriques', 'aidants_et_mediateurs_numeriques'),
                                                                            ('travailleurs_sociaux', 'aidants_et_mediateurs_numeriques'),
                                                                            ('associations_acteurs_ess', 'acteurs_prives_et_associatifs'),
                                                                            ('entreprises', 'acteurs_prives_et_associatifs'),
                                                                            ('collectivites_territoriales', 'acteurs_publics'),
                                                                            ('administrations_etablissements_publics', 'acteurs_publics'),
                                                                            ('elus', 'acteurs_publics'),
                                                                            ('enseignants_professionnels_formation', 'autres_professionnels'),
                                                                            ('autres_professionnels', 'autres_professionnels');

UPDATE "resources" r
SET "beneficiaries" = ARRAY(
        SELECT DISTINCT m.beneficiary
        FROM unnest(r.target_audiences) t(target)
                 JOIN target_to_beneficiary m ON m.target = t.target
                      )::beneficiary_tmp[];

UPDATE "resources" r
SET "professional_sectors" = ARRAY(
        SELECT DISTINCT m.professional_sector
        FROM unnest(r.target_audiences) t(target)
                 JOIN target_to_professional_sector m ON m.target = t.target
                             )::professional_sector_tmp[];

-- Update search_executions table
UPDATE "search_executions" s
SET "beneficiaries" = ARRAY(
        SELECT DISTINCT m.beneficiary
        FROM unnest(s.target_audiences) t(target)
                 JOIN target_to_beneficiary m ON m.target = t.target
                      )::beneficiary_tmp[];

UPDATE "search_executions" s
SET "professional_sectors" = ARRAY(
        SELECT DISTINCT m.professional_sector
        FROM unnest(s.target_audiences) t(target)
                 JOIN target_to_professional_sector m ON m.target = t.target
                             )::professional_sector_tmp[];

-- clean
BEGIN;
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
COMMIT;
