-- Set sequence for each resource's events based on timestamp
WITH numbered_events AS (
  SELECT 
    id,
    resource_id,
    timestamp,
    ROW_NUMBER() OVER (PARTITION BY resource_id ORDER BY timestamp) - 1 as new_sequence
  FROM resource_events
)
UPDATE resource_events
SET sequence = numbered_events.new_sequence
FROM numbered_events
WHERE resource_events.id = numbered_events.id;
