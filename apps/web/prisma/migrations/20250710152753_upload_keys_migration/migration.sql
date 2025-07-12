/* add prefix "main/" to all keys for storage migration */
UPDATE uploads SET key =  CONCAT('main/', key)
WHERE key not like 'main/%' AND legacy_key IS NULL;
