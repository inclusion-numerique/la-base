-- CreateIndex
CREATE INDEX "collection_resources_added_idx" ON "collection_resources"("added");

-- CreateIndex
CREATE INDEX "resource_views_timestamp_idx" ON "resource_views"("timestamp");

-- CreateIndex
CREATE INDEX "search_executions_timestamp_idx" ON "search_executions"("timestamp");
