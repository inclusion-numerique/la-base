-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('SectionTitle', 'File', 'Image', 'Link', 'ResourceLink', 'Text');

-- CreateTable
CREATE TABLE "account" (
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

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" UUID NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
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

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_token" (
    "token" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_token_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "base" (
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

    CONSTRAINT "base_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource" (
    "id" UUID NOT NULL,
    "legacy_id" INTEGER,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title_duplication_check_slug" TEXT NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "image_id" UUID,
    "description" TEXT NOT NULL,
    "created_by_id" UUID NOT NULL,
    "base_id" UUID,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content" (
    "id" UUID NOT NULL,
    "legacy_content_id" INTEGER,
    "legacy_section_id" INTEGER,
    "order" INTEGER NOT NULL,
    "resource_id" UUID NOT NULL,
    "type" "ContentType" NOT NULL,
    "title" TEXT,
    "caption" TEXT,
    "alt_text" TEXT,
    "image_id" UUID,
    "file_key" TEXT,
    "show_preview" BOOLEAN,
    "url" TEXT,
    "linked_resource_id" UUID,
    "legacy_linked_resource_id" INTEGER,
    "text" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" UUID NOT NULL,
    "crop_height" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "crop_width" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "crop_top" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "crop_left" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "upload_key" TEXT NOT NULL,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "upload" (
    "key" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER,
    "uploaded_by_id" UUID NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "upload_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_provider_provider_account_id_key" ON "account"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "session_session_token_key" ON "session"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "user_legacy_id_key" ON "user"("legacy_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_image_id_key" ON "user"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_identifier_token_key" ON "verification_token"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "base_legacy_id_key" ON "base"("legacy_id");

-- CreateIndex
CREATE UNIQUE INDEX "base_image_id_key" ON "base"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "base_slug_key" ON "base"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "resource_legacy_id_key" ON "resource"("legacy_id");

-- CreateIndex
CREATE UNIQUE INDEX "resource_slug_key" ON "resource"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "resource_image_id_key" ON "resource"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "content_legacy_content_id_key" ON "content"("legacy_content_id");

-- CreateIndex
CREATE UNIQUE INDEX "content_legacy_section_id_key" ON "content"("legacy_section_id");

-- CreateIndex
CREATE UNIQUE INDEX "content_image_id_key" ON "content"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "content_file_key_key" ON "content"("file_key");

-- CreateIndex
CREATE UNIQUE INDEX "image_upload_key_key" ON "image"("upload_key");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base" ADD CONSTRAINT "base_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base" ADD CONSTRAINT "base_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource" ADD CONSTRAINT "resource_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource" ADD CONSTRAINT "resource_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource" ADD CONSTRAINT "resource_base_id_fkey" FOREIGN KEY ("base_id") REFERENCES "base"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content" ADD CONSTRAINT "content_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content" ADD CONSTRAINT "content_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content" ADD CONSTRAINT "content_file_key_fkey" FOREIGN KEY ("file_key") REFERENCES "upload"("key") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content" ADD CONSTRAINT "content_linked_resource_id_fkey" FOREIGN KEY ("linked_resource_id") REFERENCES "resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_upload_key_fkey" FOREIGN KEY ("upload_key") REFERENCES "upload"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "upload" ADD CONSTRAINT "upload_uploaded_by_id_fkey" FOREIGN KEY ("uploaded_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
