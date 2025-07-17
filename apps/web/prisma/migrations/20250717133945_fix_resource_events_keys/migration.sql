-- fixes resource_events.data.fileKey for new bucket storage
UPDATE resource_events
SET data = jsonb_set(data, '{fileKey}', CONCAT('"main/', data->>'fileKey','"')::jsonb)
WHERE data->>'type' = 'File'
  AND NOT data->>'fileKey' ILIKE 'main/%'
  AND jsonb_typeof(data->'fileKey') = 'string';
