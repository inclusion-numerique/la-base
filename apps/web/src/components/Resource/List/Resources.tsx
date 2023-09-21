import React, { useMemo } from 'react'
import { Tabs } from '@codegouvfr/react-dsfr/Tabs'
import { SessionUser } from '@app/web/auth/sessionUser'
import { BaseResource } from '@app/web/server/bases/getBase'
import { CreateResourceButton } from '@app/web/components/Resource/CreateResourceModal'
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
        <CreateResourceButton className="fr-btn--secondary" />
      </div>
      <Tabs
        tabs={[
          {
            label: `Brouillons · ${drafts.length}`,
            iconId: 'fr-icon-draft-line',
            content: (
              <ResourceTab
                resources={drafts}
                user={user}
                emptyText={
                  isConnectedUser
                    ? "Vous n'avez pas de brouillons."
                    : "Cet utilisateur n'a pas de brouillons."
                }
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
                emptyText={
                  isConnectedUser
                    ? "Vous n'avez pas de ressources publiées."
                    : "Cet utilisateur n'a pas de ressources publiées."
                }
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
                emptyText={
                  isConnectedUser
                    ? "Vous n'avez pas de ressources privées."
                    : "Cet utilisateur n'a pas de ressources privées."
                }
                data-testid="resources-private-tab"
              />
            ),
          },
        ]}
      />
    </div>
  )
}

export default Resources
