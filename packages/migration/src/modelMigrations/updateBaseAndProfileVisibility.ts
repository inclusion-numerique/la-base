import { prismaClient } from '@app/web/prismaClient'

export const updateBaseAndProfileVisibility = async () => {
  // A base is public if it has at least one public resource
  const updatedBases = await prismaClient.base.updateMany({
    where: {
      isPublic: false,
      resources: {
        some: {
          isPublic: true,
        },
      },
    },
    data: {
      isPublic: true,
    },
  })

  // A profile is public if it has at least one public resource not owned by a base (directly linked to profile)
  const updatedProfiles = await prismaClient.user.updateMany({
    where: {
      isPublic: false,
      createdResources: {
        some: {
          isPublic: true,
          baseId: null,
        },
      },
    },
    data: {
      isPublic: true,
    },
  })

  return { updatedBases, updatedProfiles }
}
