-- CreateTable
CREATE TABLE "shareable_link" (
    "id" UUID NOT NULL,
    "base_id" UUID,
    "resource_id" UUID,
    "created_by_id" UUID NOT NULL,
    "accessCount" INTEGER NOT NULL DEFAULT 0,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "shareable_link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shareable_link_id_key" ON "shareable_link"("id");

-- CreateIndex
CREATE UNIQUE INDEX "shareable_link_base_id_key" ON "shareable_link"("base_id");

-- CreateIndex
CREATE UNIQUE INDEX "shareable_link_resource_id_key" ON "shareable_link"("resource_id");

-- CreateIndex
CREATE INDEX "shareable_link_base_id_enabled_idx" ON "shareable_link"("base_id", "enabled");

-- CreateIndex
CREATE INDEX "shareable_link_resource_id_enabled_idx" ON "shareable_link"("resource_id", "enabled");

-- AddForeignKey
ALTER TABLE "shareable_link" ADD CONSTRAINT "shareable_link_base_id_fkey" FOREIGN KEY ("base_id") REFERENCES "bases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shareable_link" ADD CONSTRAINT "shareable_link_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shareable_link" ADD CONSTRAINT "shareable_link_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
