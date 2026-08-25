import path from 'node:path'
import { defineConfig } from 'prisma/config'

/**
 * Prisma 7 ne lit plus `url` depuis le datasource du schéma : l'URL utilisée par la CLI
 * (migrate, db push, studio) est déclarée ici. Le client applicatif, lui, reçoit un
 * driver adapter — voir src/prismaClient.ts.
 */
export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  migrations: {
    path: path.join('prisma', 'migrations'),
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
})
