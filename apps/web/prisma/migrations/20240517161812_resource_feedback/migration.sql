-- CreateTable
CREATE TABLE "resource_feedback" (
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" TIMESTAMP(3),
    "sent_by_id" UUID NOT NULL,
    "resource_id" UUID NOT NULL,

    CONSTRAINT "resource_feedback_pkey" PRIMARY KEY ("sent_by_id","resource_id")
);

-- CreateIndex
CREATE INDEX "resource_feedback_sent_by_id_idx" ON "resource_feedback"("sent_by_id");

-- CreateIndex
CREATE INDEX "resource_feedback_resource_id_idx" ON "resource_feedback"("resource_id");

-- AddForeignKey
ALTER TABLE "resource_feedback" ADD CONSTRAINT "resource_feedback_sent_by_id_fkey" FOREIGN KEY ("sent_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_feedback" ADD CONSTRAINT "resource_feedback_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;
