import type { ResourcesDataTableSearchParams } from '@app/web/app/administration/ressources/ResourcesDataTable'
import { searchResource } from '@app/web/app/administration/ressources/searchResource'
import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'

export const getResourcesListPageData = async ({
  searchParams,
  user,
}: {
  searchParams: ResourcesDataTableSearchParams
  user: SessionUser
}) => {
  const searchResult = await searchResource({
    searchParams,
    user,
  })

  const totalCount = await prismaClient.resource.count({
    where: {
      AND: [
        { deleted: null },
        ...(user.role === 'Moderator' ? [{ isPublic: true }] : []),
      ],
    },
  })

  return {
    totalCount,
    searchResult,
    searchParams,
  }
}
