import { prismaClient } from '@app/web/prismaClient'
import { SessionUser } from '@app/web/auth/sessionUser'
import {
  defaultPaginationParams,
  defaultSearchParams,
  PaginationParams,
  SearchParams,
} from '@app/web/server/search/searchQueryParams'
import { orderItemsByIndexMap } from '@app/web/server/search/orderItemsByIndexMap'
import { profileListSelect } from '@app/web/server/profiles/getProfilesList'
import { searchToTsQueryInput } from '@app/web/server/search/searchToTsQueryInput'

/**
 * We are using advanced postgresql features not supported by Prisma for search.
 * We have to use raw SQL queries.
 * Raw SQL queries are only in search function files.
 * ⚠️ Keep in sync with prisma where filters for user rights / visibility
 * ⚠️ We cannot reuse query fragments from prismaClient with raw sql without opting out of security features. Keep conditions in sync in the 2 functions.
 */

export const countProfiles = async (
  searchParams: Pick<SearchParams, 'query'>,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const searchTerm = searchToTsQueryInput(searchParams.query)
  const userId = user?.id ?? null

  const result = await prismaClient.$queryRaw<{ count: number }[]>`
      SELECT count(*)::integer as count
      FROM users
      WHERE (
          ${searchTerm ?? ''} = ''
              OR to_tsvector('french',
                             unaccent(coalesce(users.name, '') || ' ' || coalesce(users.location, '') || ' ' ||
                                      coalesce(users.title, '') || ' ' || coalesce(users.description, ''))) @@
                 to_tsquery('french', unaccent(${searchTerm}))
          )
        AND (
          /* Authorization*/
          /* User is public  */
          users.is_public = true
              /* User is private and user is self */
              OR users.id = ${userId}::uuid
          )
        AND (
          users.deleted IS NULL
        )
  `

  return result[0]?.count ?? 0
}

export const rankProfiles = async (
  searchParams: SearchParams,
  paginationParams: PaginationParams,
  user: Pick<SessionUser, 'id'> | null,
) => {
  // To keep good dev ux, we first fetch the ids of the resources matching the search
  // Then we fetch the full resources with all the data from prisma to have good types

  const searchTerm = searchToTsQueryInput(searchParams.query)
  const userId = user?.id ?? null
  const searchResults = await prismaClient.$queryRaw<
    {
      id: string
      document_tsv: string
      query: string
      rank: number
      // An alternative to rank, may have different result (uses proximity not just vector matching)
      rank_cd: number
    }[]
  >`
      SELECT users.id,
             ts_rank_cd(to_tsvector('french',
                                    unaccent(coalesce(users.name, '') || ' ' || coalesce(users.location, '') || ' ' ||
                                             coalesce(users.title, '') || ' ' || coalesce(users.description, ''))),
                        to_tsquery('french', unaccent(${searchTerm})))              AS rank
      FROM users
      WHERE (
          coalesce(${searchTerm}, '___empty___') = '___empty___'
              OR to_tsvector('french',
                             unaccent(coalesce(users.name, '') || ' ' || coalesce(users.location, '') || ' ' ||
                                      coalesce(users.title, '') || ' ' || coalesce(users.description, ''))) @@
                 to_tsquery('french', unaccent(${searchTerm}))
          )
        AND (
          /* Authorization*/
          /* User is public  */
          users.is_public = true
              /* User is private and user is self */
              OR users.id = ${userId}::uuid
          )
        AND (
          users.deleted IS NULL
        )
      /* Order by updated desc to have most recent first on empty query */
      ORDER BY rank DESC, users.updated DESC
      LIMIT ${paginationParams.perPage} OFFSET ${
        (paginationParams.page - 1) * paginationParams.perPage
      };
  `
  // Where IN does not garantee same order as the ids array so we have to sort the results in memory
  const resultIndexById = new Map(
    searchResults.map(({ id }, index) => [id, index]),
  )

  return {
    searchResults,
    resultIndexById,
  }
}

export const searchProfiles = async (
  searchParams: SearchParams,
  paginationParams: PaginationParams,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const { searchResults, resultIndexById } = await rankProfiles(
    searchParams,
    paginationParams,
    user,
  )

  const unsortedUsers = await prismaClient.user.findMany({
    where: {
      id: {
        in: searchResults.map(({ id }) => id),
      },
    },
    select: profileListSelect(user),
  })

  return orderItemsByIndexMap(unsortedUsers, resultIndexById)
}

export type SearchProfilesResult = Awaited<ReturnType<typeof searchProfiles>>

export const quickSearchProfiles = async (
  query: string,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const { searchResults, resultIndexById } = await rankProfiles(
    { ...defaultSearchParams, query },
    { ...defaultPaginationParams, perPage: 3 },
    user,
  )

  const unsortedUsers = await prismaClient.user.findMany({
    where: {
      id: {
        in: searchResults.map(({ id }) => id),
      },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      firstName: true,
      lastName: true,
      image: {
        select: {
          id: true,
          altText: true,
        },
      },
    },
  })

  return orderItemsByIndexMap(unsortedUsers, resultIndexById)
}
