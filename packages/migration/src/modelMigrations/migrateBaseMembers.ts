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

export const getLegacyBaseOwners = () =>
  migrationPrismaClient.main_base.findMany({
    select: {
      id: true,
      owner_id: true,
    },
  })

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
    isAdmin: boolean
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

export type TransformedLegacyMember = ReturnType<typeof transformMember>

const getCompositeId = (userId: string, baseId: string) => `${userId}#${baseId}`

export const migrateBaseMembers = async ({
  userIdFromLegacyId,
  baseIdFromLegacyId,
}: {
  userIdFromLegacyId: LegacyToNewIdHelper
  baseIdFromLegacyId: LegacyToNewIdHelper
}) => {
  const legacyBaseOwners = await getLegacyBaseOwners()
  output(`- Found ${legacyBaseOwners.length} base owners to migrate`)

  const legacyBaseAdmins = await getLegacyBaseAdmins()
  output(`- Found ${legacyBaseAdmins.length} base admins to migrate`)

  const legacyBaseContributors = await getLegacyBaseContributors()
  output(
    `- Found ${legacyBaseContributors.length} base contributors to migrate`,
  )

  const { contributorIdMap, adminIdMap, newMembers } =
    await getExistingMembers()

  const membersData = [
    ...new Map<string, TransformedLegacyMember>([
      ...legacyBaseContributors.map(
        (legacyBaseContributor): [string, TransformedLegacyMember] => {
          const data = transformMember({
            contributorIdMap,
            adminIdMap,
            isAdmin: false,
            legacyMember: legacyBaseContributor,
            userIdFromLegacyId,
            baseIdFromLegacyId,
          })
          return [getCompositeId(data.memberId, data.baseId), data]
        },
      ),
      ...legacyBaseAdmins.map(
        (legacyBaseAdmin): [string, TransformedLegacyMember] => {
          const data = transformMember({
            contributorIdMap,
            adminIdMap,
            isAdmin: true,
            legacyMember: legacyBaseAdmin,
            userIdFromLegacyId,
            baseIdFromLegacyId,
          })
          return [getCompositeId(data.memberId, data.baseId), data]
        },
      ),
      ...legacyBaseOwners.map(
        (legacyBaseOwner): [string, TransformedLegacyMember] => {
          const data = transformMember({
            contributorIdMap,
            adminIdMap,
            isAdmin: true,
            legacyMember: {
              id: 0n,
              base_id: legacyBaseOwner.id,
              user_id: legacyBaseOwner.owner_id,
            },
            userIdFromLegacyId,
            baseIdFromLegacyId,
          })
          return [getCompositeId(data.memberId, data.baseId), data]
        },
      ),
    ]).values(),
  ]

  // Have existing v2 members in a Map of composite id => isAdmin
  const existingMembers = new Map<string, boolean>()
  for (const member of newMembers) {
    existingMembers.set(
      getCompositeId(member.memberId, member.baseId),
      member.isAdmin,
    )
  }

  // Have v1 members in a Map of composite id => isAdmin
  const legacyMembers = new Map<string, boolean>()
  for (const member of membersData) {
    legacyMembers.set(
      getCompositeId(member.memberId, member.baseId),
      member.isAdmin,
    )
  }

  // Remove migrated members that are no longer present in v1
  const existingMembersToRemove = newMembers.filter((member) => {
    // Do not remove members that were not migrated from v1
    if (!member.legacyId) {
      return false
    }
    const compositeId = getCompositeId(member.memberId, member.baseId)
    return !legacyMembers.has(compositeId)
  })

  const membersToUpdate = membersData.filter(
    (member) =>
      // Admin may be different in v1 and v2
      existingMembers.has(getCompositeId(member.memberId, member.baseId)) &&
      existingMembers.get(getCompositeId(member.memberId, member.baseId)) !==
        member.isAdmin,
  )

  const membersToCreate = membersData.filter(
    (member) =>
      !existingMembers.has(getCompositeId(member.memberId, member.baseId)),
  )

  output(`-- ${existingMembersToRemove.length} members to remove`)
  output(`-- ${membersToUpdate.length} members to update`)
  output(`-- ${membersToCreate.length} members to create`)

  await prismaClient.$transaction([
    ...existingMembersToRemove.map((member) =>
      prismaClient.baseMembers.delete({
        where: {
          memberId_baseId: { memberId: member.memberId, baseId: member.baseId },
        },
      }),
    ),
    ...membersToUpdate.map((member) =>
      prismaClient.baseMembers.update({
        where: {
          memberId_baseId: { memberId: member.memberId, baseId: member.baseId },
        },
        data: {
          isAdmin: member.isAdmin,
          accepted: member.accepted,
        },
      }),
    ),
    prismaClient.baseMembers.createMany({
      data: membersToCreate,
    }),
  ])

  return membersData
}
