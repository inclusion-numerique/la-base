import { prismaClient } from '@app/web/prismaClient'
import { createSlug } from '@app/web/utils/createSlug'

export const createUniqueSlug = async (title: string) => {
  const slug = createSlug(title)
  const client = prismaClient

  // Check existing resource with same slug and count the number of resources with same duplicated slug
  const [existing, count] = await Promise.all([
    client.base.findFirst({
      where: {
        slug,
      },
      select: { id: true },
    }),
    client.base.count({ where: { titleDuplicationCheckSlug: slug } }),
  ])

  // Verify if there is a duplicated slug when adding a suffix (rare edge case e.g. "foo-2" as the real og title)
  let suffixCount = count
  let checkDuplication = existing

  while (checkDuplication) {
    suffixCount += 1
    // eslint-disable-next-line no-await-in-loop
    checkDuplication = await client.base.findFirst({
      where: {
        slug: `${slug}-${suffixCount}`,
      },
      select: { id: true },
    })
  }

  if (suffixCount) {
    return `${slug}-${suffixCount}`
  }
  return slug
}
