import SynchronizeTabCounts from '@app/web/app/(public)/rechercher/[searchSegment]/SynchronizeTabCounts'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import ProfilesSearchResult from '@app/web/components/Search/ProfilesSearchResult'
import SearchResults from '@app/web/components/Search/SearchResults'
import { SearchUrlResultSortingSelect } from '@app/web/components/Search/SearchUrlResultSortingSelect'
import {
  countSearchResults,
  executeProfilesSearch,
} from '@app/web/server/search/executeSearch'
import {
  type UrlPaginationParams,
  sanitizeUrlPaginationParams,
  searchParamsFromSegment,
  searchUrl,
} from '@app/web/server/search/searchQueryParams'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const ProfilesSearchResultPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ searchSegment: string }>
  searchParams: Promise<UrlPaginationParams>
}) => {
  const { searchSegment } = await params
  const user = await getSessionUser()
  const searchExecutionParams = searchParamsFromSegment(searchSegment)
  const paginationParams = sanitizeUrlPaginationParams(await searchParams)

  const [{ profiles, profilesCount }, tabCounts] = await Promise.all([
    executeProfilesSearch(searchExecutionParams, paginationParams, user),
    countSearchResults(searchExecutionParams, user),
  ])

  return (
    <>
      <SynchronizeTabCounts tabCounts={tabCounts} />
      <SearchResults
        paginationParams={paginationParams}
        count={profilesCount}
        createPageLink={(page: number) =>
          searchUrl('profils', searchExecutionParams, {
            ...paginationParams,
            page,
          })
        }
      >
        <ProfilesSearchResult
          user={user}
          profiles={profiles}
          totalCount={profilesCount}
        >
          <SearchUrlResultSortingSelect
            paginationParams={paginationParams}
            searchParams={searchExecutionParams}
            tab="profils"
          />
        </ProfilesSearchResult>
      </SearchResults>
    </>
  )
}

export default ProfilesSearchResultPage
