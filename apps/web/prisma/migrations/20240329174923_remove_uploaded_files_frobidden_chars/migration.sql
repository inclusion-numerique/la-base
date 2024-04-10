UPDATE "uploads"
SET key=REGEXP_REPLACE(key, '[#“”]', '', 'g')
