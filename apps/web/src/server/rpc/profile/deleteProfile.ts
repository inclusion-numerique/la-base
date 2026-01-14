import { prismaClient } from '@app/web/prismaClient'
import { DeletedReason } from '@prisma/client'

const deletedUser = (id: string, timestamp: Date) => ({
  firstName: null,
  lastName: null,
  name: 'Profil supprimé',
  email: `utilisateur-supprimé+${id}@lesbases.anct.gouv.fr`,
  slug: `utilisateur-supprimé+${id}`,
  emailIsPublic: false,
  website: null,
  facebook: null,
  twitter: null,
  linkedin: null,
  imageId: null,
  location: null,
  title: null,
  description: null,
  department: null,
  isPublic: false,
  deleted: timestamp,
  updated: timestamp,
})

const resourcesToDelete = (userId: string) => ({
  where: {
    createdById: userId,
    contributors: { none: {} },
    deleted: null,
  },
})

const creatorBasesToDelete = (userId: string) => ({
  where: {
    createdById: userId,
    members: { every: { memberId: userId } },
    deleted: null,
  },
})

const basesToDelete = (userId: string) => ({
  where: {
    members: {
      some: {
        memberId: userId,
      },
    },
    deleted: null,
  },
})

const collectionsToDelete = (userId: string) => ({
  where: {
    createdById: userId,
    baseId: null,
    deleted: null,
  },
})

const softDelete = (timestamp: Date) => ({
  data: { deleted: timestamp, updated: timestamp },
})

export const deleteProfile = async (profile: {
  id: string
  reason?: DeletedReason | null
}) => {
  const timestamp = new Date()

  const userBases = await prismaClient.base.findMany({
    ...basesToDelete(profile.id),
    select: {
      _count: {
        select: { members: { where: { member: { deleted: null } } } },
      },
      id: true,
      members: {
        select: { memberId: true, isAdmin: true },
        where: { member: { deleted: null } },
      },
    },
  })

  const basesToSoftDelete = userBases.filter(
    (base) => base._count.members === 1,
  )

  if (basesToSoftDelete.length > 0) {
    await prismaClient.base.updateMany({
      where: { id: { in: basesToSoftDelete.map((base) => base.id) } },
      ...softDelete(timestamp),
    })
  }

  await prismaClient.resource.updateMany({
    ...resourcesToDelete(profile.id),
    ...softDelete(timestamp),
  })

  // Delete all bases created by the user we want to delete
  await prismaClient.base.updateMany({
    ...creatorBasesToDelete(profile.id),
    ...softDelete(timestamp),
  })

  await prismaClient.collection.updateMany({
    ...collectionsToDelete(profile.id),
    ...softDelete(timestamp),
  })

  // Use an untyped payload to avoid compile errors before Prisma client is regenerated
  const userUpdateData: any = {
    ...deletedUser(profile.id, timestamp),
    accounts: { deleteMany: {} },
    sessions: { deleteMany: {} },
  }
  if (profile.reason !== undefined) {
    userUpdateData.deletedReason = profile.reason
  }

  return prismaClient.user.update({
    where: { id: profile.id },
    data: userUpdateData,
  })
}
