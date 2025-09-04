import { searchUser } from '@app/web/app/administration/utilisateurs/searchUser'
import type { UtilisateursDataTableSearchParams } from '@app/web/app/administration/utilisateurs/UtilisateursDataTable'
import { prismaClient } from '@app/web/prismaClient'

export const getUsersListPageData = async ({
  searchParams,
}: {
  searchParams: UtilisateursDataTableSearchParams
}) => {
  const searchResult = await searchUser({
    searchParams,
  })

  const totalCount = await prismaClient.user.count({
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
