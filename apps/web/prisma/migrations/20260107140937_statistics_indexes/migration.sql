-- CreateIndex
CREATE INDEX "collection_resources_added_idx" ON "public"."collection_resources"("added");

-- CreateIndex
CREATE INDEX "resource_views_timestamp_idx" ON "public"."resource_views"("timestamp");

-- CreateIndex
CREATE INDEX "search_executions_timestamp_idx" ON "public"."search_executions"("timestamp");
