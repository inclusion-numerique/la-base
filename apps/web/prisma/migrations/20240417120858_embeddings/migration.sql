-- AlterTable
ALTER TABLE "bases" ADD COLUMN     "embedding_base" vector(1024);

-- AlterTable
ALTER TABLE "resources" ADD COLUMN     "embedding" vector(1024);

-- CreateTable
CREATE TABLE "help_center" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "vector" vector,

    CONSTRAINT "help_center_pkey" PRIMARY KEY ("id")
);
