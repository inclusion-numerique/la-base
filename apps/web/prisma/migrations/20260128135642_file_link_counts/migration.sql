-- AlterTable
ALTER TABLE "public"."contents" ADD COLUMN     "file_download_count" INTEGER,
ADD COLUMN     "file_preview_count" INTEGER,
ADD COLUMN     "link_click_count" INTEGER;
