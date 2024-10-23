import { PrismaClient } from '@prisma/client'

// https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
const globalForPrisma = global as unknown as {
  prismaClient: PrismaClient | undefined
}

const debugLog = false

export const prismaClient =
  globalForPrisma.prismaClient ??
  new PrismaClient({
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
