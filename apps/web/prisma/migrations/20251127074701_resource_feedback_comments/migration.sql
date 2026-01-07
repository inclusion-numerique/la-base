-- CreateTable
CREATE TABLE "public"."resource_feedback_comments" (
    "id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "feedback_sent_by_id" UUID NOT NULL,
    "feedback_resource_id" UUID NOT NULL,
    "parent_comment_id" UUID,
    "author_id" UUID NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" TIMESTAMP(3),

    CONSTRAINT "resource_feedback_comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "resource_feedback_comments_feedback_sent_by_id_feedback_res_idx" ON "public"."resource_feedback_comments"("feedback_sent_by_id", "feedback_resource_id");

-- CreateIndex
CREATE INDEX "resource_feedback_comments_author_id_idx" ON "public"."resource_feedback_comments"("author_id");

-- CreateIndex
CREATE INDEX "resource_feedback_comments_parent_comment_id_idx" ON "public"."resource_feedback_comments"("parent_comment_id");

-- AddForeignKey
ALTER TABLE "public"."resource_feedback_comments" ADD CONSTRAINT "resource_feedback_comments_feedback_sent_by_id_feedback_re_fkey" FOREIGN KEY ("feedback_sent_by_id", "feedback_resource_id") REFERENCES "public"."resource_feedback"("sent_by_id", "resource_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."resource_feedback_comments" ADD CONSTRAINT "resource_feedback_comments_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "public"."resource_feedback_comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."resource_feedback_comments" ADD CONSTRAINT "resource_feedback_comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
