-- CreateTable
CREATE TABLE "public"."news_feed" (
    "user_id" UUID NOT NULL,
    "professional_sectors" "public"."professional_sector"[],
    "themes" "public"."theme"[],
    "monthly_newsletter" BOOLEAN NOT NULL DEFAULT false,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastOpenedAt" TIMESTAMP(3),
    "has_complete_onboarding" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "news_feed_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "public"."news_feed" ADD CONSTRAINT "news_feed_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
