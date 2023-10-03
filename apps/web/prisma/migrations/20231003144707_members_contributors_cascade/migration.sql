-- DropForeignKey
ALTER TABLE "base_members" DROP CONSTRAINT "base_members_base_id_fkey";

-- DropForeignKey
ALTER TABLE "base_members" DROP CONSTRAINT "base_members_member_id_fkey";

-- DropForeignKey
ALTER TABLE "resource_contributors" DROP CONSTRAINT "resource_contributors_contributor_id_fkey";

-- DropForeignKey
ALTER TABLE "resource_contributors" DROP CONSTRAINT "resource_contributors_resource_id_fkey";

-- AddForeignKey
ALTER TABLE "base_members" ADD CONSTRAINT "base_members_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_members" ADD CONSTRAINT "base_members_base_id_fkey" FOREIGN KEY ("base_id") REFERENCES "bases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_contributors" ADD CONSTRAINT "resource_contributors_contributor_id_fkey" FOREIGN KEY ("contributor_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_contributors" ADD CONSTRAINT "resource_contributors_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;
