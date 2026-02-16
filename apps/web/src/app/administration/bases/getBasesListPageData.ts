import type { BasesDataTableSearchParams } from '@app/web/app/administration/bases/BasesDataTable'
import { searchBase } from '@app/web/app/administration/bases/searchBase'
import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'

export const getBasesListPageData = async ({
  searchParams,
  user,
}: {
  searchParams: BasesDataTableSearchParams
  user: SessionUser
}) => {
  const searchResult = await searchBase({
    searchParams,
    user,
  })

  const totalCount = await prismaClient.base.count({
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
