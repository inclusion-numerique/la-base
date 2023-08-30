-- AlterTable
ALTER TABLE "resources" ADD COLUMN     "targetAudiences" TEXT[],
ADD COLUMN     "supportTypes" TEXT[],
ADD COLUMN     "themes" TEXT[];
