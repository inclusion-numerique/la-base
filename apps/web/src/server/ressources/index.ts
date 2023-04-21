import { prismaClient } from '@app/web/prismaClient'

export const getRessourcesSlug = async () =>
  prismaClient.ressource.findMany({
    select: { slug: true },
  })

export const getRessourcesList = async () =>
  prismaClient.ressource.findMany({
    select: {
      title: true,
      slug: true,
    },
    orderBy: [
      {
        created: 'desc',
      },
    ],
  })

export const getRessource = async (slug: string) =>
  prismaClient.ressource.findUnique({
    select: {
      title: true,
    },
    where: {
      slug,
    },
  })

export type RessourceItem = Exclude<
  Awaited<ReturnType<typeof getRessourcesList>>,
  null
>[number]

export type Ressource = Exclude<Awaited<ReturnType<typeof getRessource>>, null>
