import React from 'react'
import EmptyBaseResources from '@app/web/components/Base/EmptyBaseResources'
import Resources from '@app/web/components/Resource/List/Resources'
import { getBasePageContext } from '@app/web/app/(public)/bases/[slug]/(consultation)/getBasePageContext'

const BaseResourcesPage = async ({ params }: { params: { slug: string } }) => {
  const { user, authorizations, base } = await getBasePageContext(params.slug)

  const { resources, id } = base

  return resources.length === 0 ? (
    <EmptyBaseResources isMember={authorizations.isMember} baseId={id} />
  ) : (
    <Resources
      resources={resources}
      user={user}
      isConnectedUser={authorizations.isMember}
      baseId={id}
    />
  )
}

export default BaseResourcesPage
