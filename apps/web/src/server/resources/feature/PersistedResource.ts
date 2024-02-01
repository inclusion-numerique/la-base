// The latest persisted resource version.
// Used for security checks
import { prismaClient } from '@app/web/prismaClient'

export const getPersistedResource = (id: string) =>
  prismaClient.resource.findUnique({
    where: { id },
    select: {
      id: true,
      slug: true,
      title: true,
      published: true,
      lastPublished: true,
      created: true,
      updated: true,
      createdById: true,
      baseId: true,
      isPublic: true,
    },
  })

export type PersistedResource = Exclude<
  Awaited<ReturnType<typeof getPersistedResource>>,
  null
>
