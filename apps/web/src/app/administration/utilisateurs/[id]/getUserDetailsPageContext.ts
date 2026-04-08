import { prismaClient } from '@app/web/prismaClient'
import { cache } from 'react'

export const getUserDetailsPageContext = cache(async (userId: string) => {
  const [user, bases, resources] = await Promise.all([
    prismaClient.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        accounts: true,
        sessions: true,
        uploads: true,
        image: true,
        newsFeed: true,
      },
    }),
    prismaClient.base.findMany({
      where: {
        members: {
          some: {
            memberId: userId,
          },
        },
        deleted: null,
      },
      select: {
        _count: {
          select: { members: { where: { member: { deleted: null } } } },
        },
        id: true,
        title: true,
        slug: true,
        members: {
          select: { memberId: true, isAdmin: true },
          where: { member: { deleted: null } },
        },
      },
    }),
    prismaClient.resource.findMany({
      where: {
        deleted: null,
        OR: [
          { createdById: userId },
          { contributors: { some: { contributorId: userId } } },
          {
            base: {
              deleted: null,
              members: {
                some: {
                  memberId: userId,
                  accepted: { not: null },
                },
              },
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
        slug: true,
        created: true,
        lastPublished: true,
        createdById: true,
        contributors: {
          where: { contributorId: userId },
          select: { contributorId: true },
        },
        base: {
          select: {
            id: true,
            title: true,
            slug: true,
            members: {
              where: {
                memberId: userId,
                accepted: { not: null },
              },
              select: { memberId: true },
            },
          },
        },
      },
      orderBy: [{ lastPublished: 'desc' }, { created: 'desc' }],
    }),
  ])

  return { user, bases, resources }
})

export type UserDetailsPageContext = Awaited<
  ReturnType<typeof getUserDetailsPageContext>
>
