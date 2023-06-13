import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import type { Prisma } from '@prisma/client'
import { ImageCropInformation } from '@app/web/utils/imageCrop'
import { migrationPrismaClient } from '@app/migration/migrationPrismaClient'
import { FindManyItemType } from '@app/migration/utils/findManyItemType'
import { LegacyIdMap } from '@app/migration/utils/legacyIdMap'

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

/**
 * We have some wierd legacy data with some negative crop values
 */
const between0and1 = (value: number) => Math.min(Math.max(value, 0), 1)

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
          cropHeight: between0and1(legacyImage.relative_height),
          cropWidth: between0and1(legacyImage.relative_width),
          cropTop: between0and1(legacyImage.relative_top),
          cropLeft: between0and1(legacyImage.relative_left),
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
