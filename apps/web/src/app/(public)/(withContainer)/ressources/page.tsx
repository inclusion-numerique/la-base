import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import ResourceCard from '@app/web/components/Resource/Card'
import { getResourcesList } from '@app/web/server/resources/getResourcesList'
import styles from './ResourcesPage.module.css'

export const revalidate = 0

const Ressources = async () => {
  const user = await getSessionUser()
  const resources = await getResourcesList({ user, take: 30, skip: 0 })

  return (
    <div className="fr-pb-20v">
      <Breadcrumb
        currentPageLabel="Ressources"
        homeLinkProps={{
          href: '/',
        }}
        segments={[]}
      />
      <div className={styles.resources}>
        {resources.map((resource) => (
          <ResourceCard key={resource.slug} resource={resource} user={user} />
        ))}
      </div>
    </div>
  )
}

export default Ressources
