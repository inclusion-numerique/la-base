import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getResourcesList } from '@app/web/server/resources'
import ResourceCard from '@app/web/components/Resource/Card'

export const revalidate = 0

const Ressources = async () => {
  const user = await getSessionUser()
  const resources = await getResourcesList(50)

  return (
    <div className="fr-pb-20v">
      <Breadcrumb
        currentPageLabel="Ressources"
        homeLinkProps={{
          href: '/',
        }}
        segments={[]}
      />
      {resources.map((resource) => (
        <ResourceCard key={resource.slug} resource={resource} user={user} />
      ))}
    </div>
  )
}

export default Ressources
