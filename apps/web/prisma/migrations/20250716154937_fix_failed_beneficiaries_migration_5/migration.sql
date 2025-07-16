
UPDATE "resources" r
SET "beneficiaries" = ARRAY(
        SELECT DISTINCT m.beneficiary
        FROM unnest(r.target_audiences) t(target)
                 JOIN target_to_beneficiary m ON m.target = t.target
                      )::beneficiary_tmp[];
