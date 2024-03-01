-- Exerpts were not updated on publish and republish due to a bug of projection persistence.

UPDATE resources SET excerpt = substr(description, 0, 300);
