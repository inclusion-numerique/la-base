import { prismaClient } from '@app/web/prismaClient'
import {
  ResourceProjection,
  createResourceProjection,
} from '@app/web/server/resources/feature/createResourceProjection'
import { HistoryEventsForResource } from '@app/web/server/resources/feature/features'
import { getResourceSelect } from '@app/web/server/resources/getResource'
import { PrismaTransaction } from '@app/web/utils/prismaTypes'

export const getResourceFromEvents = async (
  where: { slug: string } | { id: string },
): Promise<ResourceProjection | null> => {
  const resourceWithEvents = await prismaClient.resource.findUnique({
    where,
    select: {
      events: {
        select: {
          id: true,
          type: true,
          timestamp: true,
          sequence: true,
          data: true,
          byId: true,
        },
        orderBy: [{ timestamp: 'asc' }, { sequence: 'asc' }],
      },
    },
  })

  if (!resourceWithEvents) {
    return null
  }

  return createResourceProjection(
    resourceWithEvents.events as unknown as HistoryEventsForResource,
  )
}

// Resource projection do not have related object from other tables
// This allow to get the related objects and conform to the Resource type
// ⚠️ this does not exactly conforms as related entity could have been deleted as projected version is not persisted, it should be handled in the edition form
export const getResourceProjectionContext = async (
  resourceProjection: ResourceProjection,
  transaction?: PrismaTransaction,
) => {
  const client = transaction || prismaClient

  // TODO better algorithm, resource contents can be done in one query per table, then matching ids with contents
  const [createdBy, base, image, contentImages, contentFiles] =
    await Promise.all([
      client.user.findUnique({
        where: { id: resourceProjection.createdById },
        select: getResourceSelect.createdBy.select,
      }),
      resourceProjection.baseId
        ? client.base.findUnique({
            where: { id: resourceProjection.baseId },
            select: getResourceSelect.base.select,
          })
        : null,
      resourceProjection.imageId
        ? client.image.findUnique({
            where: { id: resourceProjection.imageId },
            select: getResourceSelect.image.select,
          })
        : null,
      Promise.all(
        resourceProjection.contents.map((content) =>
          content.imageId
            ? client.image.findUnique({
                where: { id: content.imageId },
                select: getResourceSelect.contents.select.image.select,
              })
            : null,
        ),
      ),
      Promise.all(
        resourceProjection.contents.map((content) =>
          content.fileKey
            ? client.upload.findUnique({
                where: { key: content.fileKey },
                select: getResourceSelect.contents.select.file.select,
              })
            : null,
        ),
      ),
    ])

  return {
    ...resourceProjection,
    createdBy,
    base,
    image,
    contents: resourceProjection.contents.map((content, index) => ({
      ...content,
      image: contentImages[index],
      file: contentFiles[index],
    })),
  }
}

export type ResourceProjectionWithContext = Awaited<
  ReturnType<typeof getResourceProjectionContext>
>

export type ContentProjectionWithContext =
  ResourceProjectionWithContext['contents'][number]

export const getResourceProjectionWithContext = async (
  where: { slug: string } | { id: string },
): Promise<ResourceProjectionWithContext | null> => {
  const resourceProjection = await getResourceFromEvents(where)
  if (!resourceProjection) {
    return null
  }
  return getResourceProjectionContext(resourceProjection)
}
