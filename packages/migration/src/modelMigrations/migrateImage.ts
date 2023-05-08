import { migrationPrismaClient } from '@app/migration/migrationPrismaClient'
import { FindManyItemType } from '@app/migration/utils/findManyItemType'
import type { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { LegacyIdMap } from '@app/migration/utils/legacyIdMap'
import { v4 } from 'uuid'

export const getLegacyImages = async () => {
  // Legacy dataset has images in the resizableimage table
  // But also in the main_filecontent table (not resized images)
  // for image file types (marked with with_preview = true in the main_filecontent table)
  const resizableImages =
    await migrationPrismaClient.main_resizableimage.findMany()
  const fileContentImages =
    await migrationPrismaClient.main_filecontent.findMany({
      where: {
        with_preview: true,
      },
    })

  return [...resizableImages, ...fileContentImages]
}

export type LegacyImage = FindManyItemType<typeof getLegacyImages>

export const getExistingImages = async (): Promise<{
  idMap: LegacyIdMap
}> => {
  const images = await prismaClient.image.findMany({
    select: {
      id: true,
      legacyId: true,
      upload: { select: { key: true, legacyKey: true } },
    },
  })

  const idMap = new Map<number, string>(
    images
      .filter(
        (image): image is (typeof images)[0] & { legacyId: number } =>
          !!image.legacyId,
      )
      .map(({ id, legacyId }) => [legacyId, id]),
  )

  return { idMap }
}

export type MigrateImageInput = {
  legacyImage: LegacyImage
  transaction: Prisma.TransactionClient
  uploadKeyFromLegacyKey: (legacyKey: string) => string
}

export const migrateImage = async ({
  legacyImage,
  transaction,
  uploadKeyFromLegacyKey,
}: MigrateImageInput) => {
  const legacyId =
    'contentblock_ptr_id' in legacyImage
      ? Number(legacyImage.contentblock_ptr_id)
      : Number(legacyImage.id)
  const data =
    'contentblock_ptr_id' in legacyImage
      ? {
          uploadKey: uploadKeyFromLegacyKey(legacyImage.file),
          altText: legacyImage.image_alt,
        }
      : ({
          cropHeight: legacyImage.relative_height,
          cropWidth: legacyImage.relative_width,
          cropTop: legacyImage.relative_top,
          cropLeft: legacyImage.relative_left,
          uploadKey: uploadKeyFromLegacyKey(legacyImage.image),
        } satisfies Parameters<typeof transaction.image.upsert>[0]['update'])

  return transaction.image.upsert({
    where: { legacyId },
    create: {
      id: v4(),
      legacyId,
      ...data,
    },
    update: data,
    select: { id: true, legacyId: true },
  })
}
