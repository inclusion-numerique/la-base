import { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { SessionUser } from '@app/web/auth/sessionUser'
import { cleanSearchTerm } from '@app/web/server/resources/searchResources'
import {
  defaultSearchParams,
  SearchParams,
} from '@app/web/server/search/searchQueryParams'
import { orderItemsByIndexMap } from '@app/web/server/search/orderItemsByIndexMap'
import { profileSelect } from '@app/web/server/profiles/getProfilesList'

/**
 * We are using advanced postgresql features not supported by Prisma for search.
 * We have to use raw SQL queries.
 * Raw SQL queries are only in search function files.
 * ⚠️ Keep in sync with prisma where filters for user rights / visibility
 * ⚠️ We cannot reuse query fragments from prismaClient with raw sql without opting out of security features. Keep conditions in sync in the 2 functions.
 * ⚠️ If you make changes in the to_tsvector search, you have to update the index in the db using a manual migration
 *    ( see 20231010132236_search/migration.sql)
 */

export const countProfiles = async (
  searchParams: Pick<SearchParams, 'query'>,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const searchTerm = cleanSearchTerm(searchParams.query)
  const userId = user?.id ?? null

  const result = await prismaClient.$queryRaw<{ count: number }[]>`
    SELECT count(*)::integer as count 
    FROM users
      WHERE
         (
              coalesce(${searchTerm}, '___empty___') = '___empty___' 
              OR to_tsvector('french', unaccent(coalesce(users.name, '') || ' ' || coalesce(users.location, '') ||  ' ' || coalesce(users.title, '') ||  ' ' || coalesce(users.description, ''))) @@
                 plainto_tsquery('french', unaccent(${searchTerm}))
          )
        AND (
          /* Authorization*/
          /* User is public  */
                users.is_public = true
              /* User is private and user is self */
              OR users.id = ${userId}::uuid
          )
`

  return result[0]?.count ?? 0
}

export const rankProfiles = async <T extends Prisma.UserSelect>(
  searchParams: SearchParams,
  user: Pick<SessionUser, 'id'> | null,
) => {
  // To keep good dev ux, we first fetch the ids of the resources matching the search
  // Then we fetch the full resources with all the data from prisma to have good types

  const searchTerm = cleanSearchTerm(searchParams.query)
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
             to_tsvector('french', unaccent(coalesce(users.name, '') || ' ' || coalesce(users.location, '') ||  ' ' || coalesce(users.title, '') ||  ' ' || coalesce(users.description, '')))::text AS document_tsv,
             plainto_tsquery('french', unaccent(${searchTerm}))::text                               AS query,
             ts_rank(to_tsvector('french', unaccent(coalesce(users.name, '') || ' ' || coalesce(users.location, '') ||  ' ' || coalesce(users.title, '') ||  ' ' || coalesce(users.description, ''))),
                     plainto_tsquery('french', unaccent(${searchTerm})))                            AS rank,
             ts_rank_cd(to_tsvector('french', unaccent(coalesce(users.name, '') || ' ' || coalesce(users.location, '') ||  ' ' || coalesce(users.title, '') ||  ' ' || coalesce(users.description, ''))),
                        plainto_tsquery('french', unaccent(${searchTerm})))                         AS rank_cd
      FROM users
      WHERE
          (
                      coalesce(${searchTerm}, '___empty___') = '___empty___'
                  OR to_tsvector('french', unaccent(coalesce(users.name, '') || ' ' || coalesce(users.location, '') ||  ' ' || coalesce(users.title, '') ||  ' ' || coalesce(users.description, ''))) @@
                     plainto_tsquery('french', unaccent(${searchTerm}))
              )
        AND (
          /* Authorization*/
          /* User is public  */
                  users.is_public = true
              /* User is private and user is self */
              OR users.id = ${userId}::uuid
          )
      /* Order by updated desc to have most recent first on empty query */
      ORDER BY rank DESC, users.updated DESC
      LIMIT ${searchParams.perPage} OFFSET ${
        (searchParams.page - 1) * searchParams.perPage
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
  user: Pick<SessionUser, 'id'> | null,
) => {
  const { searchResults, resultIndexById } = await rankProfiles(
    searchParams,
    user,
  )

  const unsortedUsers = await prismaClient.user.findMany({
    where: {
      id: {
        in: searchResults.map(({ id }) => id),
      },
    },
    select: profileSelect,
  })

  return orderItemsByIndexMap(unsortedUsers, resultIndexById)
}

export type SearchProfilesResult = Awaited<ReturnType<typeof searchProfiles>>

export const quickSearchProfiles = async (
  query: string,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const { searchResults, resultIndexById } = await rankProfiles(
    { ...defaultSearchParams, query, perPage: 3 },
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
      firstName: true,
      lastName: true,
    },
  })

  return orderItemsByIndexMap(unsortedUsers, resultIndexById)
}
