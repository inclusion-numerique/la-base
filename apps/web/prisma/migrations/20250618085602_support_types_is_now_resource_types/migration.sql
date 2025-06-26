-- temporary enums with all values
CREATE TYPE "resource_type_tmp" AS ENUM (
  'resource_pedagogique', 
  'outils_numeriques', 
  'support_pedagogique', 
  'modele_notice', 
  'tutoriel', 
  'jeu', 
  'site_web', 
  'logiciel', 
  'cartographie', 
  'annuaire', 
  'article', 
  'boite_outils', 
  'infographie', 
  'methodologie', 
  'questionnaire', 
  'video', 
  'video_webinaire'
);

-- final enum
CREATE TYPE "resource_type" AS ENUM (
  'resource_pedagogique', 
  'outils_numeriques', 
  'annuaire', 
  'article', 
  'boite_outils', 
  'infographie', 
  'methodologie', 
  'questionnaire', 
  'video_webinaire'
);

BEGIN;
  DROP INDEX IF EXISTS "resources_support_type_idx";
  ALTER TABLE "resources" ADD COLUMN "resource_types" "resource_type_tmp"[];
  ALTER TABLE "search_executions" ADD COLUMN "resource_types" "resource_type_tmp"[] DEFAULT ARRAY[]::"resource_type_tmp"[];
COMMIT;

CREATE TEMP TABLE support_to_resource (
  support support_type,
  resource resource_type_tmp
);

INSERT INTO support_to_resource (support, resource) VALUES
  ('modele_notice', 'resource_pedagogique'),
  ('tutoriel', 'resource_pedagogique'),
  ('jeu', 'resource_pedagogique'),
  ('support_pedagogique', 'resource_pedagogique'),
  ('site_web', 'outils_numeriques'),
  ('logiciel', 'outils_numeriques'),
  ('cartographie', 'outils_numeriques'),
  ('video', 'video_webinaire'),
  ('annuaire', 'annuaire'),
  ('article', 'article'),
  ('boite_outils', 'boite_outils'),
  ('infographie', 'infographie'),
  ('methodologie', 'methodologie'),
  ('questionnaire', 'questionnaire');

UPDATE "resources" r
SET "resource_types" = ARRAY(
  SELECT DISTINCT m.resource
  FROM unnest(r.support_types) s(support)
  JOIN support_to_resource m ON m.support = s.support
)::resource_type_tmp[];

UPDATE "search_executions" s
SET "resource_types" = ARRAY(
  SELECT DISTINCT m.resource
  FROM unnest(s.support_types) s(support)
  JOIN support_to_resource m ON m.support = s.support
)::resource_type_tmp[];

-- clean
BEGIN;
  DROP TABLE IF EXISTS support_to_resource;
  ALTER TABLE "search_executions" ALTER COLUMN "resource_types" DROP DEFAULT;

  ALTER TABLE "resources"
    ALTER COLUMN "resource_types" TYPE "resource_type"[]
    USING "resource_types"::text[]::"resource_type"[];

  ALTER TABLE "search_executions"
    ALTER COLUMN "resource_types" TYPE "resource_type"[]
    USING "resource_types"::text[]::"resource_type"[];

  ALTER TABLE "search_executions"
    ALTER COLUMN "resource_types" SET DEFAULT ARRAY[]::"resource_type"[];

  ALTER TABLE "resources" DROP COLUMN IF EXISTS "support_types";
  ALTER TABLE "search_executions" DROP COLUMN IF EXISTS "support_types";
  DROP TYPE IF EXISTS "support_type";
  DROP TYPE "resource_type_tmp";

  CREATE INDEX "resources_resource_types_idx" ON "resources" USING GIN ("resource_types");
COMMIT;