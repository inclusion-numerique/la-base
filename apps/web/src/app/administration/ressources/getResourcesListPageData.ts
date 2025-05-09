import type { ResourcesDataTableSearchParams } from '@app/web/app/administration/ressources/ResourcesDataTable'
import { searchResource } from '@app/web/app/administration/ressources/searchResource'
import { prismaClient } from '@app/web/prismaClient'

export const getResourcesListPageData = async ({
  searchParams,
}: {
  searchParams: ResourcesDataTableSearchParams
}) => {
  const searchResult = await searchResource({
    searchParams,
  })

  const totalCount = await prismaClient.resource.count({
    where: {
      deleted: null,
    },
  })

  return {
    totalCount,
    searchResult,
    searchParams,
  }
}
