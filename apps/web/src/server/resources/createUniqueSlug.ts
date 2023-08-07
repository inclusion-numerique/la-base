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

  // Check existing resource with same slug and count the number of resources with same duplicated slug
  const [existing, count] = await Promise.all([
    client.resource.findFirst({
      where: {
        slug,
        id: {
          not: resourceId,
        },
      },
      select: { id: true },
    }),
    client.resource.count({ where: { titleDuplicationCheckSlug: slug } }),
  ])

  // Verify if there is a duplicated slug when adding a suffix (rare edge case e.g. "foo-2" as the real og title)
  let suffixCount = count
  let checkDuplication = existing

  while (checkDuplication) {
    suffixCount += 1
    // eslint-disable-next-line no-await-in-loop
    checkDuplication = await client.resource.findFirst({
      where: {
        slug: `${slug}-${suffixCount}`,
        id: {
          not: resourceId,
        },
      },
      select: { id: true },
    })
  }

  if (suffixCount) {
    return `${slug}-${suffixCount}`
  }
  return slug
}
