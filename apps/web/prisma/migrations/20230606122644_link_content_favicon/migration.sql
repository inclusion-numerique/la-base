-- AlterTable
ALTER TABLE "contents" ADD COLUMN     "linkFaviconUrl" TEXT;

-- AlterTable
ALTER TABLE "images" ADD COLUMN     "blur_url" TEXT,
ADD COLUMN     "original_heigth" INTEGER,
ADD COLUMN     "original_width" INTEGER;
