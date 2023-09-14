import { notFound } from 'next/navigation'
import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import View from '@app/web/components/Resource/View/View'
import { getResource } from '@app/web/server/resources/getResource'
import { filterAccess } from '@app/web/server/resources/authorization'
import ViewHeader from '@app/web/components/Resource/View/ViewHeader'
import PrivateBox from '@app/web/components/PrivateBox'
import ViewSeparators from '@app/web/components/Resource/View/ViewSeparators'

const RessourcePage = async ({ params }: { params: { slug: string } }) => {
  const resource = await getResource({ slug: decodeURI(params.slug) })
  const user = await getSessionUser()

  if (!resource) {
    notFound()
  }

  const authorizations = filterAccess(resource, user)
  return (
    <>
      <Breadcrumbs
        currentPage={authorizations.resource.title}
        parents={[{ label: 'Ressources', linkProps: { href: '/ressources' } }]}
      />
      {authorizations.authorized ? (
        <View
          resource={authorizations.resource}
          isContributor={authorizations.isContributor}
        />
      ) : (
        <>
          <ViewHeader resource={authorizations.resource} />
          <ViewSeparators onlyLeft withoutPadding />
          <PrivateBox type="Ressource" />
        </>
      )}
    </>
  )
}

export default RessourcePage
