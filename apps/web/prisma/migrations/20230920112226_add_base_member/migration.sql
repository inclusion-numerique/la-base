-- CreateTable
CREATE TABLE "base_members" (
    "id" UUID NOT NULL,
    "member_id" UUID NOT NULL,
    "base_id" UUID NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "accepted" TIMESTAMP(3),
    "acceptation_token" TEXT,

    CONSTRAINT "base_members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "base_members_member_id_base_id_key" ON "base_members"("member_id", "base_id");

-- AddForeignKey
ALTER TABLE "base_members" ADD CONSTRAINT "base_members_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_members" ADD CONSTRAINT "base_members_base_id_fkey" FOREIGN KEY ("base_id") REFERENCES "bases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
