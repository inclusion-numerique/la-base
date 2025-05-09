import { getBasePageContext } from '@app/web/app/(public)/bases/[slug]/(consultation)/getBasePageContext'
import EmptyBaseResources from '@app/web/components/Base/EmptyBaseResources'
import Resources from '@app/web/components/Resource/List/Resources'
import React from 'react'

const BaseResourcesPage = async ({
  params,
}: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const {
    user,
    authorization: { hasPermission },
    base,
  } = await getBasePageContext(slug)

  const { resources, id } = base

  return resources.length === 0 ? (
    <EmptyBaseResources
      canCreateResource={hasPermission('WriteBase')}
      baseId={id}
    />
  ) : (
    <Resources
      resources={resources}
      user={user}
      canWrite={hasPermission('WriteBase')}
      baseId={id}
    />
  )
}

export default BaseResourcesPage
