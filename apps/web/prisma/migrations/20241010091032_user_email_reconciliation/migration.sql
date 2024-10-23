-- CreateTable
CREATE TABLE "user_email_reconciliation" (
    "expected_new_email" TEXT NOT NULL,
    "old_email" TEXT NOT NULL,

    CONSTRAINT "user_email_reconciliation_pkey" PRIMARY KEY ("expected_new_email")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_reconciliation_expected_new_email_key" ON "user_email_reconciliation"("expected_new_email");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_reconciliation_old_email_key" ON "user_email_reconciliation"("old_email");
