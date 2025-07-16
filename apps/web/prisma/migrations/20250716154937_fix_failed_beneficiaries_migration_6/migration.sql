
UPDATE "resources" r
SET "professional_sectors" = ARRAY(
        SELECT DISTINCT m.professional_sector
        FROM unnest(r.target_audiences) t(target)
                 JOIN target_to_professional_sector m ON m.target = t.target
                             )::professional_sector_tmp[];
