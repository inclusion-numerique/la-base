import React, { useMemo } from 'react'
import { Tabs } from '@codegouvfr/react-dsfr/Tabs'
import { SessionUser } from '@app/web/auth/sessionUser'
import { BaseResource } from '@app/web/server/bases/getBase'
import { CreateResourceButton } from '@app/web/components/Resource/CreateResourceModal'
import ResourceCard from '../Card'
import ResourceTab from './ResourceTab'
import styles from './Resources.module.css'

const Resources = ({
  resources,
  user,
  isConnectedUser,
}: {
  resources: BaseResource[]
  user: SessionUser | null
  isConnectedUser: boolean
}) => {
  const drafts = useMemo(
    () => resources.filter((resource) => resource.isPublic === null),
    [resources],
  )
  const publics = useMemo(
    () => resources.filter((resource) => resource.isPublic === true),
    [resources],
  )
  const privates = useMemo(
    () => resources.filter((resource) => resource.isPublic === false),
    [resources],
  )

  return (
    <div className={styles.container} data-testid="base-resources">
      <div className={styles.header}>
        <h3 className="fr-mb-0">Ressources · {resources.length}</h3>
        {isConnectedUser && (
          <div data-testid="create-resource-button">
            <CreateResourceButton className="fr-btn--secondary" />
          </div>
        )}
      </div>
      {isConnectedUser ? (
        <Tabs
          tabs={[
            {
              label: `Brouillons · ${drafts.length}`,
              iconId: 'fr-icon-draft-line',
              content: (
                <ResourceTab
                  resources={drafts}
                  user={user}
                  emptyText="Vous n'avez pas de brouillons."
                  data-testid="resources-draft-tab"
                />
              ),
            },
            {
              label: `Publiées · ${publics.length}`,
              iconId: 'fr-icon-earth-line',
              content: (
                <ResourceTab
                  resources={publics}
                  user={user}
                  emptyText="Vous n'avez pas de ressources publiées."
                  data-testid="resources-public-tab"
                />
              ),
            },
            {
              label: `Privées · ${privates.length}`,
              iconId: 'fr-icon-lock-line',
              content: (
                <ResourceTab
                  resources={privates}
                  user={user}
                  emptyText="Vous n'avez pas de ressources privées."
                  data-testid="resources-private-tab"
                />
              ),
            },
          ]}
        />
      ) : (
        resources.map((resource) => (
          <ResourceCard key={resource.slug} resource={resource} user={user} />
        ))
      )}
    </div>
  )
}

export default Resources
