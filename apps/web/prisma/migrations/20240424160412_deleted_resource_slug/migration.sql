UPDATE resources SET slug = slug || '-deleted-' || gen_random_uuid()
WHERE deleted IS NOT NULL;
