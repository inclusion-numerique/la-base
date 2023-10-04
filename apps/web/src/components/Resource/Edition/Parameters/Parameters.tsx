import React from 'react'
import classNames from 'classnames'
import { Resource } from '@app/web/server/resources/getResource'
import { SessionUser } from '@app/web/auth/sessionUser'
import Card from '@app/web/components/Card'
import InviteContributors from '../../Contributors/InviteContributors'
import SideMenu from './SideMenu'
import Publication from './Publication'
import Visibility from './Visibility'
import Deletion from './Deletion'
import styles from './Parameters.module.css'
import Indexation from './Indexation'

const Parameters = ({
  resource,
  user,
}: {
  resource: Resource
  user: SessionUser
}) => (
  <div className={classNames('fr-container', styles.container)}>
    <SideMenu />
    <div>
      <h1 className="fr-mb-6w">Paramètres de la ressource</h1>
      <Publication resource={resource} user={user} />
      <Visibility resource={resource} user={user} />
      <Indexation resource={resource} />
      <Card
        id="contributeurs"
        className="fr-mt-3w"
        title="Contributeurs"
        description="Les contributeurs peuvent voir, éditer, inviter d’autres contributeurs et supprimer la ressource."
      >
        <InviteContributors resource={resource} />
      </Card>
      <Card
        className="fr-my-3w wip"
        id="supprimer"
        title="Supprimer la ressource"
        description="Texte explicatif sur la suppression des données ?"
      >
        <Deletion resource={resource} />
      </Card>
    </div>
  </div>
)

export default Parameters
