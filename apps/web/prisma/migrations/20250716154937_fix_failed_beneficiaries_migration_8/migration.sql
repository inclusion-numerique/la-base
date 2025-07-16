
UPDATE "search_executions" s
SET "professional_sectors" = ARRAY(
        SELECT DISTINCT m.professional_sector
        FROM unnest(s.target_audiences) t(target)
                 JOIN target_to_professional_sector m ON m.target = t.target
                             )::professional_sector_tmp[];
