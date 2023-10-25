-- AlterTable
ALTER TABLE "collections" ADD COLUMN     "is_favorites" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "legacy_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "collections_legacy_id_key" ON "collections"("legacy_id");

UPDATE collections SET is_favorites = true WHERE title = 'Mes favoris';
