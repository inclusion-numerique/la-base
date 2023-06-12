-- CreateEnum
CREATE TYPE "resource_event_type" AS ENUM ('created', 'migrated', 'published', 'title_and_description_edited', 'image_edited', 'base_changed', 'content_added', 'content_edited', 'content_removed', 'content_reordered');

-- CreateEnum
CREATE TYPE "content_type" AS ENUM ('section_title', 'file', 'image', 'link', 'text');

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" UUID NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "legacy_id" INTEGER,
    "first_name" TEXT,
    "last_name" TEXT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "email_verified" TIMESTAMP(3),
    "image_id" UUID,
    "location" TEXT,
    "title" TEXT,
    "description" TEXT,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "token" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_tokens_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "bases" (
    "id" UUID NOT NULL,
    "legacy_id" INTEGER,
    "title" TEXT NOT NULL,
    "image_id" UUID,
    "slug" TEXT NOT NULL,
    "title_duplication_check_slug" TEXT NOT NULL,
    "description" TEXT,
    "owner_id" UUID NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resources" (
    "id" UUID NOT NULL,
    "legacy_id" INTEGER,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title_duplication_check_slug" TEXT NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "image_id" UUID,
    "description" TEXT NOT NULL,
    "created_by_id" UUID NOT NULL,
    "published" TIMESTAMP(3),
    "base_id" UUID,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource_events" (
    "id" UUID NOT NULL,
    "type" "resource_event_type" NOT NULL,
    "data" JSONB NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "sequence" INTEGER NOT NULL DEFAULT 0,
    "resource_id" UUID NOT NULL,
    "by_id" UUID,

    CONSTRAINT "resource_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contents" (
    "id" UUID NOT NULL,
    "legacy_content_id" INTEGER,
    "legacy_section_id" INTEGER,
    "legacy_linked_resource_id" INTEGER,
    "order" INTEGER NOT NULL,
    "resource_id" UUID NOT NULL,
    "type" "content_type" NOT NULL,
    "title" TEXT,
    "caption" TEXT,
    "image_id" UUID,
    "file_key" TEXT,
    "show_preview" BOOLEAN,
    "url" TEXT,
    "linkDescription" TEXT,
    "linkTitle" TEXT,
    "linkImageUrl" TEXT,
    "linkFaviconUrl" TEXT,
    "text" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" UUID NOT NULL,
    "legacy_id" INTEGER,
    "alt_text" TEXT,
    "blur_url" TEXT,
    "original_heigth" INTEGER,
    "original_width" INTEGER,
    "crop_height" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "crop_width" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "crop_top" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "crop_left" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "height" INTEGER,
    "width" INTEGER,
    "upload_key" TEXT NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "uploads" (
    "key" TEXT NOT NULL,
    "legacy_key" TEXT,
    "mime_type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER,
    "uploaded_by_id" UUID,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "uploads_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_legacy_id_key" ON "users"("legacy_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_image_id_key" ON "users"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "bases_legacy_id_key" ON "bases"("legacy_id");

-- CreateIndex
CREATE UNIQUE INDEX "bases_image_id_key" ON "bases"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "bases_slug_key" ON "bases"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "resources_legacy_id_key" ON "resources"("legacy_id");

-- CreateIndex
CREATE UNIQUE INDEX "resources_slug_key" ON "resources"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "resources_image_id_key" ON "resources"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "contents_legacy_content_id_key" ON "contents"("legacy_content_id");

-- CreateIndex
CREATE UNIQUE INDEX "contents_legacy_section_id_key" ON "contents"("legacy_section_id");

-- CreateIndex
CREATE UNIQUE INDEX "contents_image_id_key" ON "contents"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "contents_file_key_key" ON "contents"("file_key");

-- CreateIndex
CREATE UNIQUE INDEX "images_legacy_id_key" ON "images"("legacy_id");

-- CreateIndex
CREATE UNIQUE INDEX "images_upload_key_key" ON "images"("upload_key");

-- CreateIndex
CREATE UNIQUE INDEX "uploads_legacy_key_key" ON "uploads"("legacy_key");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bases" ADD CONSTRAINT "bases_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bases" ADD CONSTRAINT "bases_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resources" ADD CONSTRAINT "resources_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resources" ADD CONSTRAINT "resources_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resources" ADD CONSTRAINT "resources_base_id_fkey" FOREIGN KEY ("base_id") REFERENCES "bases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_events" ADD CONSTRAINT "resource_events_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_events" ADD CONSTRAINT "resource_events_by_id_fkey" FOREIGN KEY ("by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_file_key_fkey" FOREIGN KEY ("file_key") REFERENCES "uploads"("key") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_upload_key_fkey" FOREIGN KEY ("upload_key") REFERENCES "uploads"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "uploads" ADD CONSTRAINT "uploads_uploaded_by_id_fkey" FOREIGN KEY ("uploaded_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
