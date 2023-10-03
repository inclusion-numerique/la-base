import { v4 } from 'uuid'
import { output } from '@app/cli/output'
import { prismaClient } from '@app/web/prismaClient'
import { migrationPrismaClient } from '@app/migration/migrationPrismaClient'
import { UpsertCreateType } from '@app/migration/utils/UpsertCreateType'
import { FindManyItemType } from '@app/migration/utils/findManyItemType'
import { LegacyIdMap } from '@app/migration/utils/legacyIdMap'
import { LegacyToNewIdHelper } from '@app/migration/legacyToNewIdHelper'

// Means contributors in v2 resource
export const getLegacyResourceContributors = () =>
  migrationPrismaClient.main_resource_contributors.findMany()

export type LegacyResourceContributor = FindManyItemType<
  typeof getLegacyResourceContributors
>

export const getExistingContributors = async (): Promise<{
  contributorIdMap: LegacyIdMap
  newContributors: {
    id: string
    legacyId: number | null
    contributorId: string
    resourceId: string
  }[]
}> => {
  const contributors = await prismaClient.resourceContributors.findMany({
    select: {
      id: true,
      legacyId: true,
      resourceId: true,
      contributorId: true,
    },
  })

  const contributorIdMap = new Map<number, string>()
  for (const contributor of contributors) {
    if (!contributor.legacyId) {
      continue
    }
    contributorIdMap.set(contributor.legacyId, contributor.id)
  }

  return { contributorIdMap, newContributors: contributors }
}

export const transformContributor = ({
  legacyContributor,
  userIdFromLegacyId,
  resourceIdFromLegacyId,
  contributorIdMap,
}: {
  legacyContributor: LegacyResourceContributor
  userIdFromLegacyId: LegacyToNewIdHelper
  resourceIdFromLegacyId: LegacyToNewIdHelper
  contributorIdMap: LegacyIdMap
}) => {
  const legacyId = Number(legacyContributor.id)

  const userId = userIdFromLegacyId(Number(legacyContributor.user_id))
  if (!userId) {
    throw new Error(`Cannot find user id for legacy contributor ${legacyId}`)
  }

  const resourceId = resourceIdFromLegacyId(
    Number(legacyContributor.resource_id),
  )
  if (!resourceId) {
    throw new Error(
      `Cannot find resource id for legacy contributor ${legacyId}`,
    )
  }

  const data = {
    id: contributorIdMap.get(legacyId) ?? v4(),
    contributorId: userId,
    resourceId,
    legacyId,
  } satisfies UpsertCreateType<typeof prismaClient.resourceContributors.upsert>

  return data
}

export type TransformedLegacyContributor = ReturnType<
  typeof transformContributor
>

const getCompositeId = (userId: string, resourceId: string) =>
  `${userId}#${resourceId}`

export const migrateResourceContributors = async ({
  userIdFromLegacyId,
  resourceIdFromLegacyId,
}: {
  userIdFromLegacyId: LegacyToNewIdHelper
  resourceIdFromLegacyId: LegacyToNewIdHelper
}) => {
  const legacyResourceContributors = await getLegacyResourceContributors()
  output(
    `- Found ${legacyResourceContributors.length} resource contributors to migrate`,
  )

  const { contributorIdMap, newContributors } = await getExistingContributors()

  const contributorsData = [
    // Deduplicating just to be sure
    ...new Map<string, TransformedLegacyContributor>(
      legacyResourceContributors.map(
        (legacyResourceContributor): [string, TransformedLegacyContributor] => {
          const data = transformContributor({
            contributorIdMap,
            legacyContributor: legacyResourceContributor,
            userIdFromLegacyId,
            resourceIdFromLegacyId,
          })
          return [getCompositeId(data.contributorId, data.resourceId), data]
        },
      ),
    ).values(),
  ]

  // Have existing v2 contributors in a Set of composite id => isAdmin
  const existingContributors = new Set<string>()
  for (const contributor of newContributors) {
    existingContributors.add(
      getCompositeId(contributor.contributorId, contributor.resourceId),
    )
  }

  // Have v1 contributors in a Map of composite id => isAdmin
  const legacyContributors = new Set<string>()
  for (const contributor of contributorsData) {
    legacyContributors.add(
      getCompositeId(contributor.contributorId, contributor.resourceId),
    )
  }

  // Remove migrated contributors that are no longer present in v1
  const existingContributorsToRemove = newContributors.filter((contributor) => {
    // Do not remove contributors that were not migrated from v1
    if (!contributor.legacyId) {
      return false
    }
    const compositeId = getCompositeId(
      contributor.contributorId,
      contributor.resourceId,
    )
    return !legacyContributors.has(compositeId)
  })

  const contributorsToCreate = contributorsData.filter(
    (contributor) =>
      !existingContributors.has(
        getCompositeId(contributor.contributorId, contributor.resourceId),
      ),
  )

  output(`-- ${existingContributorsToRemove.length} contributors to remove`)
  output(`-- ${contributorsToCreate.length} contributors to create`)

  await prismaClient.$transaction([
    ...existingContributorsToRemove.map((contributor) =>
      prismaClient.resourceContributors.delete({
        where: {
          contributorId_resourceId: {
            contributorId: contributor.contributorId,
            resourceId: contributor.resourceId,
          },
        },
      }),
    ),
    prismaClient.resourceContributors.createMany({
      data: contributorsToCreate,
    }),
  ])

  return contributorsData
}
