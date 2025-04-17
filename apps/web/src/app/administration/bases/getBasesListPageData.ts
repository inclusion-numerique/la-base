import { BasesDataTableSearchParams } from '@app/web/app/administration/bases/BasesDataTable'
import { searchBase } from '@app/web/app/administration/bases/searchBase'
import { prismaClient } from '@app/web/prismaClient'

export const getBasesListPageData = async ({
  searchParams,
}: {
  searchParams: BasesDataTableSearchParams
}) => {
  const searchResult = await searchBase({
    searchParams,
  })

  const totalCount = await prismaClient.base.count({
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
