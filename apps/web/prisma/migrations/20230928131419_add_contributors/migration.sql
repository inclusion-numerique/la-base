-- CreateTable
CREATE TABLE "resource_contributors" (
    "id" UUID NOT NULL,
    "contributor_id" UUID NOT NULL,
    "resource_id" UUID NOT NULL,
    "added" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resource_contributors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "resource_contributors_contributor_id_resource_id_key" ON "resource_contributors"("contributor_id", "resource_id");

-- AddForeignKey
ALTER TABLE "resource_contributors" ADD CONSTRAINT "resource_contributors_contributor_id_fkey" FOREIGN KEY ("contributor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_contributors" ADD CONSTRAINT "resource_contributors_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
