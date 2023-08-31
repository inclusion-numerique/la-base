import { prismaClient } from '@app/web/prismaClient'

export const getProfilePageQuery = async (id: string) =>
  prismaClient.user.findUnique({
    select: {
      id: true,
      name: true,
      firstName: true,
      isPublic: true,
    },
    where: { id },
  })

export type ProfilePageData = Exclude<
  Awaited<ReturnType<typeof getProfilePageQuery>>,
  null
>
