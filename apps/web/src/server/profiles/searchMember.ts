import { prismaClient } from '@app/web/prismaClient'
import { profileListSelect } from '@app/web/server/profiles/getProfilesList'

/**
 * Used when we want to search for a member to add to a base or a resource.
 * It is a special case as we can search private profiles, but we don't use search engine
 */
export const searchMember = async ({
  query,
  notInBaseId,
  notInResourceId,
}: {
  query: string
  notInBaseId?: string
  notInResourceId?: string
}) =>
  prismaClient.user.findMany({
    select: profileListSelect(null),
    where: {
      ...(notInBaseId
        ? {
            bases: {
              none: { baseId: notInBaseId },
            },
          }
        : {}),
      ...(notInResourceId
        ? {
            resources: {
              none: { resourceId: notInResourceId },
            },
          }
        : {}),
      emailVerified: { not: null },
      deleted: null,
      OR: [
        { firstName: { contains: query, mode: 'insensitive' } },
        { lastName: { contains: query, mode: 'insensitive' } },
        { name: { contains: query, mode: 'insensitive' } },
        { slug: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } },
      ],
    },
    take: 5,
  })
