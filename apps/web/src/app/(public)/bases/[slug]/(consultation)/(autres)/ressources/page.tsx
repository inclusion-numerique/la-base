import { getBasePageContext } from '@app/web/app/(public)/bases/[slug]/(consultation)/getBasePageContext'
import EmptyBaseResources from '@app/web/components/Base/EmptyBaseResources'
import Resources from '@app/web/components/Resource/List/Resources'

const BaseResourcesPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const {
    user,
    authorization: { hasPermission },
    base,
  } = await getBasePageContext(slug)

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
      title="Ressources"
      resources={resources}
      user={user}
      canWrite={canWrite}
      baseId={id}
    />
  )
}

export default BaseResourcesPage
