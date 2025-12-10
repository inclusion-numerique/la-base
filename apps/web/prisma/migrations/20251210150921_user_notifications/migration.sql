-- CreateEnum
CREATE TYPE "public"."notification_type" AS ENUM ('reported_resource', 'resource_feedback', 'resource_modification', 'resource_deletion', 'resource_comment', 'accepted_base_invitation', 'declined_base_invitation', 'base_role_change', 'base_deletion', 'base_member_deletion', 'ask_join_base', 'accepted_ask_join_base', 'declined_ask_join_base');

-- CreateTable
CREATE TABLE "public"."notifications" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "type" "public"."notification_type" NOT NULL,
    "resource_id" UUID,
    "base_id" UUID,
    "initiator_id" UUID,
    "is_base_new_role_admin" BOOLEAN,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_seen_at" TIMESTAMP(3),

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notifications" ADD CONSTRAINT "notifications_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notifications" ADD CONSTRAINT "notifications_base_id_fkey" FOREIGN KEY ("base_id") REFERENCES "public"."bases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notifications" ADD CONSTRAINT "notifications_initiator_id_fkey" FOREIGN KEY ("initiator_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
