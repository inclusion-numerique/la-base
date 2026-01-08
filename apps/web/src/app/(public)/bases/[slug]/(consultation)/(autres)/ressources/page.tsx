import { getBasePageContext } from '@app/web/app/(public)/bases/[slug]/(consultation)/getBasePageContext'
import EmptyBaseResources from '@app/web/components/Base/EmptyBaseResources'
import Resources from '@app/web/components/Resource/List/Resources'
import ResourcesPagination from '@app/web/components/Resource/ResourcesPagination'
import {
  getBaseResourcesCount,
  getBaseResourcesPaginated,
} from '@app/web/server/bases/getBase'
import {
  paginationParamsToUrlQueryParams,
  sanitizeUrlPaginationParams,
  UrlPaginationParams,
} from '@app/web/server/search/searchQueryParams'

export const dynamic = 'force-dynamic'

const BaseResourcesPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<UrlPaginationParams>
}) => {
  const paginationParams = sanitizeUrlPaginationParams(await searchParams)
  const { slug } = await params
  const {
    user,
    authorization: { hasPermission },
    base,
  } = await getBasePageContext(slug)

  const [resources, totalCount] = await Promise.all([
    getBaseResourcesPaginated(base.id, user, paginationParams),
    getBaseResourcesCount(base.id, user, paginationParams.search),
  ])

  const { id, members, createdById } = base

  const isAdmin = user?.role === 'Admin'
  const isBaseCreator = user?.id === createdById
  const isBaseMember = members.some(
    (member) => member.memberId === user?.id && member.accepted,
  )

  const canWrite = isAdmin
    ? isBaseCreator || isBaseMember
    : hasPermission('WriteBase')

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
    return `/bases/${slug}/ressources${query ? `?${query}` : ''}`
  }

  return totalCount === 0 ? (
    <EmptyBaseResources canCreateResource={canWrite} baseId={id} />
  ) : (
    <ResourcesPagination
      paginationParams={paginationParams}
      count={totalCount}
      createPageLink={createPageLink}
    >
      <Resources
        slug={slug}
        paginationParams={paginationParams}
        title="Ressources"
        resources={resources}
        user={user}
        canWrite={canWrite}
        baseId={id}
        totalCount={totalCount}
      />
    </ResourcesPagination>
  )
}

export default BaseResourcesPage
