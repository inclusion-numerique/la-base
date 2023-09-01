import React, { useMemo } from 'react'
import { Tabs } from '@codegouvfr/react-dsfr/Tabs'
import { SessionUser } from '@app/web/auth/sessionUser'
import { BaseResource } from '@app/web/server/bases/getBase'
import { CreateResourceButton } from '@app/web/components/Resource/CreateResourceModal'
import Empty from './Empty'
import styles from './Resources.module.css'
import ResourceTab from './ResourceTab'

const Resources = ({
  resources,
  user,
  isMember,
}: {
  resources: BaseResource[]
  user: SessionUser
  isMember: boolean
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

  return resources.length === 0 ? (
    <Empty isMember={isMember} />
  ) : (
    <div className={styles.container} data-testid="base-resources">
      <div className={styles.header}>
        <h3 className="fr-mb-0">Ressources · {resources.length}</h3>
        <CreateResourceButton className="fr-btn--secondary" />
      </div>
      <Tabs
        tabs={[
          {
            label: `Brouillons · ${drafts.length}`,
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
    </div>
  )
}

export default Resources
