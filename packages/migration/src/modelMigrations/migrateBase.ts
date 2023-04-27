import { migrationPrismaClient } from '@app/migration/migrationPrismaClient'
import { FindManyItemType } from '@app/migration/utils/findManyItemType'
import { v4 } from 'uuid'
import type { Prisma } from '@prisma/client'
import { LegacyToNewIdHelper } from '@app/migration/legacyToNewIdHelper'
import { prismaClient } from '@app/web/prismaClient'
import { SlugToLegacyIdMap } from '@app/migration/utils/computeSlugAndUpdateExistingSlugs'
import { LegacyIdMap } from '@app/migration/utils/legacyIdMap'

export const getLegacyBases = () => migrationPrismaClient.main_base.findMany()

export type LegacyBase = FindManyItemType<typeof getLegacyBases>

export const getExistingBases = async (): Promise<{
  slugMap: SlugToLegacyIdMap
  idMap: LegacyIdMap
}> => {
  const bases = await prismaClient.base.findMany({
    select: { slug: true, legacyId: true, id: true },
  })

  const slugMap = new Map<string, number | null>(
    bases.map(({ slug, legacyId }) => [slug, legacyId]),
  )

  const idMap = new Map<number, string>(
    bases
      .filter(
        (base): base is (typeof bases)[0] & { legacyId: number } =>
          !!base.legacyId,
      )
      .map(({ id, legacyId }) => [legacyId, id]),
  )

  return { slugMap, idMap }
}

export type MigrateBaseInput = {
  legacyBase: LegacyBase
  transaction: Prisma.TransactionClient
  userIdFromLegacyId: LegacyToNewIdHelper
  // Deduplicated slug
  slug: string
}

export const migrateBase = async ({
  legacyBase,
  slug,
  transaction,
  userIdFromLegacyId,
}: MigrateBaseInput) => {
  const legacyId = Number(legacyBase.id)
  const data = {
    ownerId: userIdFromLegacyId(Number(legacyBase.owner_id)),
    title: legacyBase.title,
    description: legacyBase.description,
    slug,
    created: legacyBase.created,
    updated: legacyBase.modified,
  } satisfies Parameters<typeof transaction.base.upsert>[0]['update']

  return transaction.base.upsert({
    where: { legacyId },
    create: {
      id: v4(),
      legacyId,
      ...data,
    },
    update: data,
    select: { id: true, ownerId: true, legacyId: true },
  })
}
