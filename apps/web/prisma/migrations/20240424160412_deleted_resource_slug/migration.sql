
/* postgresql set a uuid at the end of resources.slug when deleted is not null */
UPDATE resources SET slug = slug || '-deleted-' || gen_random_uuid()
WHERE deleted IS NOT NULL;
