import { notFound } from 'next/navigation'
import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import ResourceView from '@app/web/components/Resource/View/ResourceView'
import { getResource } from '@app/web/server/resources/getResource'
import { filterAccess } from '@app/web/server/resources/authorization'
import ResourceViewHeader from '@app/web/components/Resource/View/ResourceViewHeader'
import PrivateBox from '@app/web/components/PrivateBox'
import ResourceViewSeparators from '@app/web/components/Resource/View/ResourceViewSeparators'
import {
  defaultSearchParams,
  searchUrl,
} from '@app/web/server/search/searchQueryParams'
import { setVisitHashCookie } from '@app/web/server/visitHash/setVisitHashCookie'

const RessourcePage = async ({ params }: { params: { slug: string } }) => {
  const user = await getSessionUser()
  const resource = await getResource({ slug: decodeURI(params.slug) }, user)

  if (!resource) {
    notFound()
  }

  setVisitHashCookie()

  const authorizations = filterAccess(resource, user)

  return (
    <div className="fr-container">
      <Breadcrumbs
        currentPage={authorizations.resource.title}
        parents={[
          {
            label: 'Ressources',
            linkProps: { href: searchUrl('ressources', defaultSearchParams) },
          },
        ]}
      />
      {authorizations.authorized ? (
        <ResourceView
          user={user}
          resource={authorizations.resource}
          isAdmin={authorizations.isAdmin}
        />
      ) : (
        <>
          <ResourceViewHeader resource={authorizations.resource} />
          <ResourceViewSeparators onlyLeft withoutPadding />
          <PrivateBox type="Ressource" />
        </>
      )}
    </div>
  )
}

export default RessourcePage
