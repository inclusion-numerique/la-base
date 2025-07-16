
-- Update search_executions table
UPDATE "search_executions" s
SET "beneficiaries" = ARRAY(
        SELECT DISTINCT m.beneficiary
        FROM unnest(s.target_audiences) t(target)
                 JOIN target_to_beneficiary m ON m.target = t.target
                      )::beneficiary_tmp[];
