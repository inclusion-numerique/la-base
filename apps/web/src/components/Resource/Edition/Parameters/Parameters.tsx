import React from 'react'
import classNames from 'classnames'
import { Resource } from '@app/web/server/resources/getResource'
import Card from '@app/web/components/Card'
import InviteContributors from '../../Contributors/InviteContributors'
import SideMenu from './SideMenu'
import styles from './Parameters.module.css'

const Parameters = ({ resource }: { resource: Resource }) => (
  <div className={classNames('fr-container', styles.container)}>
    <SideMenu />
    <div>
      <h1 className="fr-mb-6w">Paramètres de la ressource</h1>
      <Card
        title="Contributeurs"
        description="Les contributeurs peuvent voir, éditer, inviter d’autres contributeurs et supprimer la ressource."
      >
        <InviteContributors resource={resource} />
      </Card>
    </div>
  </div>
)

export default Parameters
