-- CreateEnum
CREATE TYPE "AssistantChatRole" AS ENUM ('user', 'assistant');

-- CreateTable
CREATE TABLE "AssistantChatSession" (
    "id" UUID NOT NULL,
    "created_by_id" UUID,
    "context" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssistantChatSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssistantChatMessage" (
    "id" UUID NOT NULL,
    "role" "AssistantChatRole" NOT NULL,
    "session_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssistantChatMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AssistantChatSession" ADD CONSTRAINT "AssistantChatSession_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssistantChatMessage" ADD CONSTRAINT "AssistantChatMessage_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "AssistantChatSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
