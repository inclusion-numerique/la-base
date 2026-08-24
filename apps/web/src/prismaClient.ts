import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

// https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
const globalForPrisma = global as unknown as {
  prismaClient: PrismaClient | undefined
}

const debugLog = false

// Prisma 7 ne lit plus l'URL depuis le schéma : la connexion passe par un driver adapter.
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })

export const prismaClient =
  globalForPrisma.prismaClient ??
  new PrismaClient({
    adapter,
    log: debugLog
      ? [
          {
            emit: 'stdout',
            level: 'query',
          },
          {
            emit: 'stdout',
            level: 'error',
          },
          {
            emit: 'stdout',
            level: 'info',
          },
          {
            emit: 'stdout',
            level: 'warn',
          },
        ]
      : undefined,
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prismaClient = prismaClient
}
