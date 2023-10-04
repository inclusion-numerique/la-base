/*
  Warnings:

  - You are about to drop the column `supportTypes` on the `resources` table. All the data in the column will be lost.
  - You are about to drop the column `targetAudiences` on the `resources` table. All the data in the column will be lost.
  - The `themes` column on the `resources` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "theme" AS ENUM ('diagnostic_de_competences_numeriques', 'demarches_et_services_en_ligne', 'maitrise_des_outils_numeriques', 'navigation_sur_internet', 'usage_du_materiel_informatique', 'sobriete_numerique', 'materiel_reconditionne', 'mobilites', 'accessibilite', 'acteurs_du_numerique', 'arts_et_culture', 'citoyennete_et_engagement', 'code_et_programmation', 'communication_en_ligne_et_reseaux_sociaux', 'education_et_formation', 'emploi_et_entrepreunariat', 'jeux_videos', 'numerique_en_sante', 'parentalite', 'risques_cyber_et_protection', 'communs_numeriques', 'economie_numerique', 'gouvernances_partagees', 'intelligence_artificielle', 'open_source_et_licences_libres', 'souverainete_numerique_et_hebergement_des_donnees');

-- AlterTable
ALTER TABLE "resources" DROP COLUMN "supportTypes",
DROP COLUMN "targetAudiences",
ADD COLUMN     "support_types" TEXT[],
ADD COLUMN     "target_audiences" TEXT[],
DROP COLUMN "themes",
ADD COLUMN     "themes" "theme"[];

-- CreateIndex
CREATE INDEX "resources_themes_idx" ON "resources" USING GIN ("themes");

-- CreateIndex
CREATE INDEX "resources_support_type_idx" ON "resources" USING GIN ("support_types");

-- CreateIndex
CREATE INDEX "resources_target_audiences_idx" ON "resources" USING GIN ("target_audiences");
