import { notFound, redirect } from 'next/navigation'
import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { getResource } from '@app/web/server/resources/getResource'
import { filterAccess } from '@app/web/server/resources/authorization'
import Parameters from '@app/web/components/Resource/Edition/Parameters/Parameters'

const ResourceParametersPage = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/ressources/${params.slug}/parametres`)
  }

  const resource = await getResource({ slug: decodeURI(params.slug) })
  if (!resource) {
    notFound()
  }

  const authorizations = filterAccess(resource, user)
  if (!authorizations.authorized || !authorizations.isAdmin) {
    redirect(`/ressources/${params.slug}`)
  }

  return (
    <>
      <div className="fr-container">
        <Breadcrumbs
          currentPage="Paramètres de la ressource"
          parents={[
            { label: 'Ressources', linkProps: { href: '/rechercher' } },
            {
              label: resource.title,
              linkProps: { href: `/ressources/${resource.slug}` },
            },
          ]}
        />
      </div>

      <div className="fr-mt-1w fr-mb-4w">
        <Parameters resource={resource} user={user} />
      </div>
    </>
  )
}
export default ResourceParametersPage
