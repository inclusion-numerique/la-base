UPDATE resources SET views_count = (SELECT COUNT(*) FROM resource_views WHERE resource_views.resource_id = resources.id);

UPDATE resources SET last_view = (SELECT MAX(timestamp) FROM resource_views WHERE resource_views.resource_id = resources.id);
