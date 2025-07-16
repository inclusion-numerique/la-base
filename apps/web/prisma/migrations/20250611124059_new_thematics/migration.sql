BEGIN;
    UPDATE resources 
    SET themes = array_replace(themes, 'usage_du_materiel_informatique', 'maitrise_des_outils_numeriques')
    WHERE 'usage_du_materiel_informatique' = ANY(themes);

    UPDATE resources 
    SET themes = array_remove(themes, 'acteurs_du_numerique')
    WHERE 'acteurs_du_numerique' = ANY(themes);

    UPDATE resources 
    SET themes = array_remove(themes, 'education_et_formation')
    WHERE 'education_et_formation' = ANY(themes);

    UPDATE resources 
    SET themes = array_remove(themes, 'inclusion_numerique')
    WHERE 'inclusion_numerique' = ANY(themes);
COMMIT;

DO $$
DECLARE
    batch_size INTEGER := 1000;
    affected_rows INTEGER;
BEGIN
    LOOP
        UPDATE search_executions 
        SET themes = array_replace(themes, 'usage_du_materiel_informatique', 'maitrise_des_outils_numeriques')
        WHERE id IN (
            SELECT id FROM search_executions 
            WHERE 'usage_du_materiel_informatique' = ANY(themes)
            LIMIT batch_size
        );
        
        GET DIAGNOSTICS affected_rows = ROW_COUNT;
        EXIT WHEN affected_rows = 0;
    END LOOP;

    LOOP
        UPDATE search_executions 
        SET themes = array_remove(themes, 'acteurs_du_numerique')
        WHERE id IN (
            SELECT id FROM search_executions 
            WHERE 'acteurs_du_numerique' = ANY(themes)
            LIMIT batch_size
        );
        
        GET DIAGNOSTICS affected_rows = ROW_COUNT;
        EXIT WHEN affected_rows = 0;
    END LOOP;

    LOOP
      UPDATE search_executions 
      SET themes = array_remove(themes, 'education_et_formation')
      WHERE id IN (
          SELECT id FROM search_executions 
          WHERE 'education_et_formation' = ANY(themes)
          LIMIT batch_size
      );
      
      GET DIAGNOSTICS affected_rows = ROW_COUNT;
      EXIT WHEN affected_rows = 0;
    END LOOP;

    LOOP
        UPDATE search_executions 
        SET themes = array_remove(themes, 'inclusion_numerique')
        WHERE id IN (
            SELECT id FROM search_executions 
            WHERE 'inclusion_numerique' = ANY(themes)
            LIMIT batch_size
        );
        
        GET DIAGNOSTICS affected_rows = ROW_COUNT;
        EXIT WHEN affected_rows = 0;
    END LOOP;
END $$;

-- We need to create a new enum type with the new themes but keeping the old ones for backward compatibility
BEGIN;
    CREATE TYPE "theme_new" AS ENUM ('diagnostic_de_competences_numeriques', 'communication_en_ligne_et_reseaux_sociaux', 'demarches_et_services_en_ligne', 'arts_et_culture', 'aides_aux_demarches_administratives', 'maitrise_des_outils_numeriques', 'navigation_sur_internet', 'sobriete_numerique', 'materiel_reconditionne', 'mobilites', 'accessibilite', 'loisirs_et_creations_numeriques', 'citoyennete_et_engagement', 'code_et_programmation', 'reseaux_sociaux_et_communication', 'donnees', 'emploi_et_entrepreunariat', 'jeux_videos', 'numerique_en_sante', 'parentalite', 'risques_cyber_et_protection', 'communs_numeriques', 'economie_numerique', 'gouvernances_partagees', 'intelligence_artificielle', 'open_source_et_licences_libres', 'souverainete_numerique_et_hebergement_des_donnees', 'ecoconception_de_services_numeriques', 'usages_responsables_du_numerique', 'numerique_au_service_de_l_environnement', 'territoires_connectes_et_durables', 'education_aux_medias');

    ALTER TABLE "search_executions" ALTER COLUMN "themes" DROP DEFAULT;
    ALTER TABLE "resources" ALTER COLUMN "themes" TYPE "theme_new"[] USING ("themes"::text::"theme_new"[]);
    ALTER TABLE "search_executions" ALTER COLUMN "themes" TYPE "theme_new"[] USING ("themes"::text::"theme_new"[]);

    UPDATE resources 
    SET themes = array_replace(themes, 'demarches_et_services_en_ligne', 'aides_aux_demarches_administratives')
    WHERE 'demarches_et_services_en_ligne' = ANY(themes);
    
    UPDATE resources 
    SET themes = array_replace(themes, 'arts_et_culture', 'loisirs_et_creations_numeriques')
    WHERE 'arts_et_culture' = ANY(themes);
    
    UPDATE resources 
    SET themes = array_replace(themes, 'communication_en_ligne_et_reseaux_sociaux', 'reseaux_sociaux_et_communication')
    WHERE 'communication_en_ligne_et_reseaux_sociaux' = ANY(themes);

    DO $$
    DECLARE
        batch_size INTEGER := 1000;
        affected_rows INTEGER;
    BEGIN
        LOOP
            UPDATE search_executions 
            SET themes = array_replace(themes, 'demarches_et_services_en_ligne', 'aides_aux_demarches_administratives')
            WHERE id IN (
                SELECT id FROM search_executions 
                WHERE 'demarches_et_services_en_ligne' = ANY(themes)
                LIMIT batch_size
            );
            
            GET DIAGNOSTICS affected_rows = ROW_COUNT;
            EXIT WHEN affected_rows = 0;
        END LOOP;

        LOOP
            UPDATE search_executions 
            SET themes = array_replace(themes, 'arts_et_culture', 'loisirs_et_creations_numeriques')
            WHERE id IN (
                SELECT id FROM search_executions 
                WHERE 'arts_et_culture' = ANY(themes)
                LIMIT batch_size
            );
            
            GET DIAGNOSTICS affected_rows = ROW_COUNT;
            EXIT WHEN affected_rows = 0;
        END LOOP;

        LOOP
            UPDATE search_executions 
            SET themes = array_replace(themes, 'communication_en_ligne_et_reseaux_sociaux', 'reseaux_sociaux_et_communication')
            WHERE id IN (
                SELECT id FROM search_executions 
                WHERE 'communication_en_ligne_et_reseaux_sociaux' = ANY(themes)
                LIMIT batch_size
            );
            
            GET DIAGNOSTICS affected_rows = ROW_COUNT;
            EXIT WHEN affected_rows = 0;
        END LOOP;
    END $$;

    ALTER TYPE "theme" RENAME TO "theme_old";
    ALTER TYPE "theme_new" RENAME TO "theme";
    DROP TYPE "theme_old";
    ALTER TABLE "search_executions" ALTER COLUMN "themes" SET DEFAULT ARRAY[]::"theme"[];
COMMIT;

BEGIN;

    CREATE TYPE "theme_final" AS ENUM ('diagnostic_de_competences_numeriques', 'aides_aux_demarches_administratives', 'maitrise_des_outils_numeriques', 'navigation_sur_internet', 'sobriete_numerique', 'materiel_reconditionne', 'mobilites', 'accessibilite', 'loisirs_et_creations_numeriques', 'citoyennete_et_engagement', 'code_et_programmation', 'reseaux_sociaux_et_communication', 'donnees', 'emploi_et_entrepreunariat', 'jeux_videos', 'numerique_en_sante', 'parentalite', 'risques_cyber_et_protection', 'communs_numeriques', 'economie_numerique', 'gouvernances_partagees', 'intelligence_artificielle', 'open_source_et_licences_libres', 'souverainete_numerique_et_hebergement_des_donnees', 'ecoconception_de_services_numeriques', 'usages_responsables_du_numerique', 'numerique_au_service_de_l_environnement', 'territoires_connectes_et_durables', 'education_aux_medias');

    ALTER TABLE "search_executions" ALTER COLUMN "themes" DROP DEFAULT;
    ALTER TABLE "resources" ALTER COLUMN "themes" TYPE "theme_final"[] USING ("themes"::text::"theme_final"[]);
    ALTER TABLE "search_executions" ALTER COLUMN "themes" TYPE "theme_final"[] USING ("themes"::text::"theme_final"[]);

    ALTER TYPE "theme" RENAME TO "theme_temp";
    ALTER TYPE "theme_final" RENAME TO "theme";
    DROP TYPE "theme_temp";

    ALTER TABLE "search_executions" ALTER COLUMN "themes" SET DEFAULT ARRAY[]::"theme"[];

COMMIT;