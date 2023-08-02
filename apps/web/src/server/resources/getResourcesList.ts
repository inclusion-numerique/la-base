import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'

export const getResourcesList = async ({
  take,
  user,
  skip,
}: {
  take?: number
  skip?: number
  user?: Pick<SessionUser, 'id'> | null
}) => {
  const whereResourceIsPublic = {
    isPublic: true,
    base: { isPublic: true },
  }

  const where = {
    ...(user
      ? {
          OR: [
            whereResourceIsPublic,
            // Public or created by user
            { createdById: user.id },
          ],
        }
      : whereResourceIsPublic),
    deleted: null,
  }

  return prismaClient.resource.findMany({
    where,
    select: {
      title: true,
      slug: true,
      created: true,
      updated: true,
      description: true,
      isPublic: true,
      image: {
        select: {
          id: true,
          altText: true,
        },
      },
      createdBy: {
        select: {
          name: true,
          id: true,
        },
      },
      base: {
        select: {
          title: true,
          slug: true,
          isPublic: true,
        },
      },
    },
    orderBy: [
      {
        created: 'desc',
      },
    ],
    skip,
    take,
  })
}

export type ResourceListItem = Exclude<
  Awaited<ReturnType<typeof getResourcesList>>,
  null
>[number]
