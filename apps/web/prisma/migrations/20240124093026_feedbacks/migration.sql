-- CreateEnum
CREATE TYPE "difficulty_area" AS ENUM ('search', 'resources', 'collections', 'profile', 'bases', 'other');

-- CreateTable
CREATE TABLE "feedback" (
    "id" UUID NOT NULL,
    "sent_by_id" UUID,
    "rating" INTEGER NOT NULL,
    "had_difficulty" BOOLEAN NOT NULL DEFAULT false,
    "difficulty_area" "difficulty_area",
    "difficulty_comment" TEXT,
    "comment" TEXT,
    "wants_to_be_contacted" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "feedback_sent_by_id_idx" ON "feedback"("sent_by_id");

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_sent_by_id_fkey" FOREIGN KEY ("sent_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
