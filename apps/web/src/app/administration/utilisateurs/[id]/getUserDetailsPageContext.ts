import { cache } from 'react'
import { prismaClient } from '@app/web/prismaClient'

export const getUserDetailsPageContext = cache(async (userId: string) => {
  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      accounts: true,
      sessions: true,
      uploads: true,
    },
  })
  const bases = await prismaClient.base.findMany({
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
  })

  return { user, bases }
})

export type UserDetailsPageContext = Awaited<
  ReturnType<typeof getUserDetailsPageContext>
>
