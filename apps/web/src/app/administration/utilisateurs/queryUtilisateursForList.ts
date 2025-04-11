import type { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'

export const searchUtilisateurSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  created: true,
  deleted: true,
  slug: true,
  isPublic: true,
  _count: {
    select: {
      followedBy: true,
      createdResources: {
        where: {
          deleted: null,
        },
      },
    },
  },
} satisfies Prisma.UserSelect

export const queryUtilisateursForList = async ({
  skip,
  take,
  where,
  orderBy,
}: {
  where: Prisma.UserWhereInput
  take?: number
  skip?: number
  orderBy?: Prisma.UserOrderByWithRelationInput[]
}) =>
  prismaClient.user
    .findMany({
      where,
      take,
      skip,
      select: searchUtilisateurSelect,
      orderBy: [
        ...(orderBy ?? []),
        {
          lastName: 'asc',
        },
      ],
    })
    .then((utilisateurs) =>
      utilisateurs.map(
        (user) =>
          // TODO transform for easier use in UI ?
          user,
      ),
    )

export type UtilisateurForList = Awaited<
  ReturnType<typeof queryUtilisateursForList>
>[number]
