import { getProfilePageContext } from '@app/web/app/(public)/profils/[slug]/(consultation)/getProfilePageContext'
import {
  ProfilePermissions,
  ProfileRoles,
} from '@app/web/authorization/models/profileAuthorization'
import EmptyProfileResources from '@app/web/components/Profile/EmptyProfileResources'
import Resources from '@app/web/components/Resource/List/Resources'
import ResourcesPagination from '@app/web/components/Resource/ResourcesPagination'
import { getResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import {
  getProfileResources,
  getProfileResourcesCount,
} from '@app/web/server/resources/getResourcesList'
import {
  paginationParamsToUrlQueryParams,
  sanitizeUrlPaginationParams,
  UrlPaginationParams,
} from '@app/web/server/search/searchQueryParams'
import { isDefinedAndNotNull } from '@app/web/utils/isDefinedAndNotNull'
import { applyDraft } from '@app/web/utils/resourceDraft'

const ProfilePage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<UrlPaginationParams>
}) => {
  const paginationParams = sanitizeUrlPaginationParams(await searchParams)
  const { slug } = await params
  // Auth and profile has been checked in layout
  const { profile, user, authorization } = await getProfilePageContext(slug)

  const [resources, totalCount] = await Promise.all([
    getProfileResources(profile.id, user, paginationParams),
    getProfileResourcesCount(profile.id, user, paginationParams.search),
  ])

  const isAdmin = user?.role === 'Admin'
  const isOwner = authorization.hasRole(ProfileRoles.ProfileOwner)
  const canWrite = isAdmin
    ? isOwner
    : authorization.hasPermission(ProfilePermissions.WriteProfile)

  // Array of resources with their draft if they are in draft state
  const ressourcesAndDrafts = await Promise.all(
    resources.map((ressource) =>
      // Only fetch draft if the resource is in draft state (not published)
      ressource.published
        ? { ressource, draft: null }
        : getResourceProjectionWithContext({
            slug: decodeURI(ressource.slug),
          }).then((draft) => ({
            ressource,
            draft,
          })),
    ),
  )

  // Apply draft to resource if it exists
  const ressourcesWithAppliedDraft = ressourcesAndDrafts
    .map(({ ressource, draft }) =>
      draft ? applyDraft(ressource, draft) : ressource,
    )
    .filter(isDefinedAndNotNull)

  const createPageLink = (page: number) => {
    const urlParams = paginationParamsToUrlQueryParams({
      ...paginationParams,
      page,
    })
    const params = new URLSearchParams()
    if (urlParams.page) params.set('page', urlParams.page as string)
    if (urlParams.tri) params.set('tri', urlParams.tri as string)
    if (urlParams.search) params.set('search', urlParams.search as string)
    const query = params.toString()
    return `/profils/${slug}${query ? `?${query}` : ''}`
  }

  return totalCount === 0 ? (
    <EmptyProfileResources canWrite={canWrite} isOwner={isOwner} />
  ) : (
    <ResourcesPagination
      paginationParams={paginationParams}
      count={totalCount}
      createPageLink={createPageLink}
    >
      <Resources
        paginationParams={paginationParams}
        isOwner={isOwner}
        title={isOwner ? 'Mes ressources' : 'Ressources'}
        resources={ressourcesWithAppliedDraft}
        canWrite={canWrite}
        user={user}
        slug={slug}
        baseId={null}
        totalCount={totalCount}
      />
    </ResourcesPagination>
  )
}

export default ProfilePage
