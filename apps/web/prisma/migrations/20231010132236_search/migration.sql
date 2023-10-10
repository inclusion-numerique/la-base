-- Search extension and indexes
CREATE EXTENSION IF NOT EXISTS unaccent;

CREATE INDEX resources_search ON resources USING gin(to_tsvector('french', unaccent(title || ' ' || description)));
CREATE INDEX bases_search ON bases USING gin(to_tsvector('french', unaccent(title || ' ' || coalesce(description,''))));
CREATE INDEX profile_search ON users USING gin(to_tsvector('french', unaccent(coalesce(name, '') || ' ' || coalesce(location, '') ||  ' ' || coalesce(title, '') ||  ' ' || coalesce(description, ''))));

