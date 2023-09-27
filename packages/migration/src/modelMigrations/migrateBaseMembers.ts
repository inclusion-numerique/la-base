import { chunk } from 'lodash'
import { v4 } from 'uuid'
import { output } from '@app/cli/output'
import { prismaClient } from '@app/web/prismaClient'
import { migrationPrismaClient } from '@app/migration/migrationPrismaClient'
import { UpsertCreateType } from '@app/migration/utils/UpsertCreateType'
import { FindManyItemType } from '@app/migration/utils/findManyItemType'
import { LegacyIdMap } from '@app/migration/utils/legacyIdMap'
import { LegacyToNewIdHelper } from '@app/migration/legacyToNewIdHelper'

export const getLegacyBaseAdmins = () =>
  migrationPrismaClient.main_base_admins.findMany()
// Means members in v2 base
export const getLegacyBaseContributors = () =>
  migrationPrismaClient.main_base_contributors.findMany()

export type LegacyBaseAdmin = FindManyItemType<typeof getLegacyBaseAdmins>
export type LegacyBaseContributor = FindManyItemType<
  typeof getLegacyBaseContributors
>

export const getExistingMembers = async (): Promise<{
  adminIdMap: LegacyIdMap
  contributorIdMap: LegacyIdMap
  newMembers: {
    id: string
    legacyId: number | null
    memberId: string
    baseId: string
  }[]
}> => {
  const members = await prismaClient.baseMembers.findMany({
    select: {
      id: true,
      legacyId: true,
      baseId: true,
      isAdmin: true,
      memberId: true,
    },
  })

  const adminIdMap = new Map<number, string>()
  const contributorIdMap = new Map<number, string>()
  for (const member of members) {
    if (!member.legacyId) {
      continue
    }
    if (member.isAdmin) {
      adminIdMap.set(member.legacyId, member.id)
      continue
    }
    contributorIdMap.set(member.legacyId, member.id)
  }

  return { adminIdMap, contributorIdMap, newMembers: members }
}

export const transformMember = ({
  legacyMember,
  isAdmin,
  userIdFromLegacyId,
  baseIdFromLegacyId,
  adminIdMap,
  contributorIdMap,
}: {
  legacyMember: LegacyBaseAdmin | LegacyBaseContributor
  isAdmin: boolean
  userIdFromLegacyId: LegacyToNewIdHelper
  baseIdFromLegacyId: LegacyToNewIdHelper
  adminIdMap: LegacyIdMap
  contributorIdMap: LegacyIdMap
}) => {
  const legacyId = Number(legacyMember.id)

  const userId = userIdFromLegacyId(Number(legacyMember.user_id))
  if (!userId) {
    throw new Error(`Cannot find user id for legacy member ${legacyId}`)
  }

  const baseId = baseIdFromLegacyId(Number(legacyMember.base_id))
  if (!baseId) {
    throw new Error(`Cannot find base id for legacy member ${legacyId}`)
  }

  const data = {
    id: isAdmin
      ? adminIdMap.get(legacyId) ?? v4()
      : contributorIdMap.get(legacyId) ?? v4(),
    isAdmin: true,
    accepted: new Date('2023-09-01T00:00:00.000Z'),
    memberId: userId,
    baseId,
    legacyId,
  } satisfies UpsertCreateType<typeof prismaClient.baseMembers.upsert>

  return data
}

export const migrateBaseMembers = async ({
  userIdFromLegacyId,
  baseIdFromLegacyId,
}: {
  userIdFromLegacyId: LegacyToNewIdHelper
  baseIdFromLegacyId: LegacyToNewIdHelper
}) => {
  const legacyBaseAdmins = await getLegacyBaseAdmins()
  output(`- Found ${legacyBaseAdmins.length} base admins to migrate`)

  const legacyBaseContributors = await getLegacyBaseContributors()
  output(
    `- Found ${legacyBaseContributors.length} base contributors to migrate`,
  )

  const { contributorIdMap, adminIdMap, newMembers } =
    await getExistingMembers()

  const membersData = [
    ...legacyBaseAdmins.map((legacyBaseAdmin) =>
      transformMember({
        contributorIdMap,
        adminIdMap,
        isAdmin: true,
        legacyMember: legacyBaseAdmin,
        userIdFromLegacyId,
        baseIdFromLegacyId,
      }),
    ),
    ...legacyBaseContributors.map((legacyBaseContributor) =>
      transformMember({
        contributorIdMap,
        adminIdMap,
        isAdmin: false,
        legacyMember: legacyBaseContributor,
        userIdFromLegacyId,
        baseIdFromLegacyId,
      }),
    ),
  ]

  // Remove duplicates based on memberId and legacyId
  const uniqueIdsIndex = new Set<string>()
  const uniqueMembersData = membersData.filter((member) => {
    const key = `${member.memberId}-${member.baseId}`
    if (uniqueIdsIndex.has(key)) {
      return false
    }
    uniqueIdsIndex.add(key)
    return true
  })

  const chunkSize = 200
  let migratedMembersCount = 0

  const upserted = await Promise.all(
    chunk(uniqueMembersData, chunkSize).map((membersChunk) =>
      prismaClient
        .$transaction(
          membersChunk.map((member) =>
            prismaClient.baseMembers.upsert({
              where: {
                memberId_baseId: {
                  memberId: member.memberId,
                  baseId: member.baseId,
                },
              },
              create: member,
              update: member,
              select: { id: true, legacyId: true },
            }),
          ),
        )
        .then((members) => {
          migratedMembersCount += members.length
          output(
            `-- ${migratedMembersCount} ${(
              (migratedMembersCount * 100) /
              membersData.length
            ).toFixed(0)}%`,
          )
          return members
        }),
    ),
  )

  return upserted.flat()
}
