/*
  Warnings:

  - The `support_types` column on the `resources` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `target_audiences` column on the `resources` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "support_type" AS ENUM ('support_pedagogique', 'tutoriel', 'jeu', 'methodologie', 'site_web', 'boite_outils', 'logiciel', 'questionnaire', 'cartographie', 'annuaire', 'modele_notice', 'article', 'infographie', 'video');

-- CreateEnum
CREATE TYPE "target_audience" AS ENUM ('tous_publics', 'mediateurs_numeriques', 'travailleurs_sociaux', 'associations_acteurs_ess', 'entreprises', 'collectivites_territoriales', 'administrations_etablissements_publics', 'elus', 'aidants_numeriques', 'autres_professionnels', 'enseignants_professionnels_formation', 'particuliers', 'jeunes_enfants_6', 'enfants_6_12', 'adolescents_12_18', 'jeunes_adultes_18_25', 'adultes', 'parents', 'seniors_personnes_agees', 'personnes_tres_eloignees_numerique', 'personnes_insertion_professionnelle', 'personnes_en_insertion_sociale', 'personnes_perte_autonomie', 'refugies_demandeurs_asile', 'personne_situation_illetrisme', 'personne_allophone', 'personne_situation_handicap');

-- AlterTable
ALTER TABLE "resources" DROP COLUMN "support_types",
ADD COLUMN     "support_types" "support_type"[],
DROP COLUMN "target_audiences",
ADD COLUMN     "target_audiences" "target_audience"[];

-- CreateIndex
CREATE INDEX "resources_support_type_idx" ON "resources" USING GIN ("support_types");

-- CreateIndex
CREATE INDEX "resources_target_audiences_idx" ON "resources" USING GIN ("target_audiences");
