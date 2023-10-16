import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'

export const getSessionUserFromSessionToken = async (
  sessionToken: string | null,
): Promise<SessionUser | null> => {
  if (!sessionToken) {
    return null
  }

  const res = await prismaClient.session.findFirst({
    where: {
      sessionToken,
      expires: { gt: new Date() },
    },
    include: {
      user: {
        select: {
          id: true,
          legacyId: true,
          email: true,
          firstName: true,
          lastName: true,
          name: true,
          emailVerified: true,
          image: true,
          title: true,
          location: true,
          description: true,
          created: true,
          updated: true,
          isPublic: true,
          ownedBases: {
            select: {
              id: true,
              slug: true,
              title: true,
              isPublic: true,
            },
            where: {
              deleted: null,
            },
          },
          bases: {
            select: {
              isAdmin: true,
              base: {
                select: {
                  id: true,
                  slug: true,
                  title: true,
                  isPublic: true,
                },
              },
            },
            where: {
              accepted: {
                not: null,
              },
              base: {
                deleted: null,
              },
            },
          },
          resources: {
            select: {
              resourceId: true,
            },
            where: {
              resource: {
                deleted: null,
              },
            },
          },
          createdResources: {
            select: {
              id: true,
              slug: true,
            },
            where: {
              deleted: null,
            },
          },
        },
      },
    },
  })

  if (!res?.user) {
    return null
  }

  return {
    ...res.user,
    created: res.user.created.toISOString(),
    updated: res.user.updated.toISOString(),
    emailVerified: res.user.emailVerified?.toISOString() ?? null,
  }
}
