import { output } from '@app/cli/output'
import type { StoredItem } from '@app/web/features/uploads/migration/listStorageItems'
import { prismaClient } from '@app/web/prismaClient'
import type { OrphanedFile } from './types'

// Pattern: {namespace}/images/{imageId}/{filename}_{cropKey}_{width|original}_{quality}.webp
const processedWebpRegex =
  /^[^/]+\/images\/([a-f0-9-]{36})\/.+_(?:nocrop|\d+(?:\.\d+)?_\d+(?:\.\d+)?_\d+(?:\.\d+)?_\d+(?:\.\d+)?)_(?:\d+|original)_\d+\.webp$/

// Pattern: {namespace}/external-image/{hash}
const externalImageRegex = /^[^/]+\/external-image\//

const isProcessedWebpCache = (key: string): boolean =>
  processedWebpRegex.test(key)

const extractImageIdFromCacheKey = (key: string): string | null => {
  const match = processedWebpRegex.exec(key)
  return match?.[1] ?? null
}

const isExternalImagePath = (key: string): boolean =>
  externalImageRegex.test(key)

export const findOrphanedFiles = async ({
  s3Objects,
  thresholdDate,
}: {
  s3Objects: StoredItem[]
  thresholdDate: Date
}): Promise<{
  orphans: OrphanedFile[]
  stats: {
    totalScanned: number
    skippedExternalImage: number
    skippedFileContent: number
    skippedTooRecent: number
  }
}> => {
  output('Chargement des records Upload...')
  const allUploads = await prismaClient.upload.findMany({
    select: { key: true, created: true },
  })
  const uploadKeySet = new Set(allUploads.map((u) => u.key))
  const uploadCreatedMap = new Map(allUploads.map((u) => [u.key, u.created]))

  output(`  ${allUploads.length} uploads charges`)

  output('Chargement des records Image avec relations...')
  const allImages = await prismaClient.image.findMany({
    select: {
      id: true,
      uploadKey: true,
      user: { select: { id: true } },
      base: { select: { id: true } },
      baseCoverImage: { select: { id: true } },
      resource: { select: { id: true } },
      collection: { select: { id: true } },
      content: { select: { id: true } },
    },
  })

  const imageByUploadKey = new Map(allImages.map((img) => [img.uploadKey, img]))
  const imageById = new Map(allImages.map((img) => [img.id, img]))

  output(`  ${allImages.length} images chargees`)

  output('Chargement des Content.fileKey (fichiers non-image)...')
  const allFileContents = await prismaClient.content.findMany({
    where: { fileKey: { not: null } },
    select: { fileKey: true },
  })
  const fileKeySet = new Set(
    allFileContents.map((c) => c.fileKey).filter(Boolean) as string[],
  )

  output(`  ${fileKeySet.size} fichiers Content charges`)

  const orphans: OrphanedFile[] = []
  const stats = {
    totalScanned: s3Objects.length,
    skippedExternalImage: 0,
    skippedFileContent: 0,
    skippedTooRecent: 0,
  }

  const isImageOrphaned = (image: {
    user: { id: string } | null
    base: { id: string } | null
    baseCoverImage: { id: string } | null
    resource: { id: string } | null
    collection: { id: string } | null
    content: { id: string } | null
  }): boolean =>
    !image.user &&
    !image.base &&
    !image.baseCoverImage &&
    !image.resource &&
    !image.collection &&
    !image.content

  for (const s3Object of s3Objects) {
    const key = s3Object.Key
    const lastModified = s3Object.LastModified
    const size = s3Object.Size ?? 0

    if (isExternalImagePath(key)) {
      stats.skippedExternalImage++
      continue
    }

    if (fileKeySet.has(key)) {
      stats.skippedFileContent++
      continue
    }

    const referenceDate = uploadCreatedMap.get(key) ?? lastModified
    if (referenceDate && referenceDate > thresholdDate) {
      stats.skippedTooRecent++
      continue
    }

    if (isProcessedWebpCache(key)) {
      const sourceImageId = extractImageIdFromCacheKey(key)
      if (!sourceImageId) {
        orphans.push({
          key,
          size,
          lastModified,
          category: 'orphaned-webp-cache',
          reason: "Impossible d'extraire l'ID image du cache WebP",
        })
        continue
      }

      const sourceImage = imageById.get(sourceImageId)
      if (!sourceImage) {
        orphans.push({
          key,
          size,
          lastModified,
          category: 'orphaned-webp-cache',
          reason: `Image source ${sourceImageId} inexistante`,
        })
        continue
      }

      if (isImageOrphaned(sourceImage)) {
        orphans.push({
          key,
          size,
          lastModified,
          category: 'orphaned-webp-cache',
          reason: `Image source ${sourceImageId} orpheline`,
        })
      }
      continue
    }

    if (!uploadKeySet.has(key)) {
      orphans.push({
        key,
        size,
        lastModified,
        category: 'no-upload-record',
        reason: 'Aucun record Upload en DB',
      })
      continue
    }

    // -- upload without Image (and not a file Content - already checked above)
    const imageForKey = imageByUploadKey.get(key)
    if (!imageForKey) {
      orphans.push({
        key,
        size,
        lastModified,
        category: 'upload-no-image',
        reason: 'Upload existe mais aucune Image ne le reference',
      })
      continue
    }

    // -- image without parent entity
    if (isImageOrphaned(imageForKey)) {
      orphans.push({
        key,
        size,
        lastModified,
        category: 'image-no-entity',
        reason:
          'Image existe mais aucune entite (User/Base/Resource/Collection/Content) ne la référence',
      })
    }
  }

  return { orphans, stats }
}
