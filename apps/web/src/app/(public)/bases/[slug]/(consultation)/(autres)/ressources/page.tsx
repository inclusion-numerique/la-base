import { getBasePageContext } from '@app/web/app/(public)/bases/[slug]/(consultation)/getBasePageContext'
import EmptyBaseResources from '@app/web/components/Base/EmptyBaseResources'
import Resources from '@app/web/components/Resource/List/Resources'
import {
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
  } = await getBasePageContext(slug, undefined, paginationParams)

  const { resources, id, members, createdById } = base

  const isAdmin = user?.role === 'Admin'
  const isBaseCreator = user?.id === createdById
  const isBaseMember = members.some(
    (member) => member.memberId === user?.id && member.accepted,
  )

  const canWrite = isAdmin
    ? isBaseCreator || isBaseMember
    : hasPermission('WriteBase')

  return resources.length === 0 ? (
    <EmptyBaseResources canCreateResource={canWrite} baseId={id} />
  ) : (
    <Resources
      slug={slug}
      paginationParams={paginationParams}
      title="Ressources"
      resources={resources}
      user={user}
      canWrite={canWrite}
      baseId={id}
    />
  )
}

export default BaseResourcesPage
