-- CreateTable
CREATE TABLE "base_join_requests" (
    "id" UUID NOT NULL,
    "applicant_id" UUID NOT NULL,
    "base_id" UUID NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accepted" TIMESTAMP(3),
    "declined" TIMESTAMP(3),

    CONSTRAINT "base_join_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "base_join_requests_applicant_id_base_id_key" ON "base_join_requests"("applicant_id", "base_id");

-- AddForeignKey
ALTER TABLE "base_join_requests" ADD CONSTRAINT "base_join_requests_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_join_requests" ADD CONSTRAINT "base_join_requests_base_id_fkey" FOREIGN KEY ("base_id") REFERENCES "bases"("id") ON DELETE CASCADE ON UPDATE CASCADE;
