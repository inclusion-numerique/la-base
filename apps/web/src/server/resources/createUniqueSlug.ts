import { prismaClient } from '@app/web/prismaClient'
import { createSlug } from '@app/web/utils/createSlug'
import { PrismaTransaction } from '@app/web/utils/prismaTypes'

export const createUniqueSlug = async (
  title: string,
  resourceId?: string,
  transaction?: PrismaTransaction,
) => {
  const slug = createSlug(title)
  const client = transaction ?? prismaClient
  const [existing, count] = await Promise.all([
    client.resource.findUnique({ where: { slug }, select: { id: true } }),
    client.resource.count(),
  ])
  return existing && existing.id !== resourceId ? `${slug}-${count + 1}` : slug
}
