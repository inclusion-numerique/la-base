import React from 'react'
import classNames from 'classnames'
import { Resource } from '@app/web/server/resources/getResource'
import { SessionUser } from '@app/web/auth/sessionUser'
import Card from '@app/web/components/Card'
import ResourceParametersSideMenu from '@app/web/components/Resource/Edition/Parameters/ResourceParametersSideMenu'
import ResourcePublication from '@app/web/components/Resource/Edition/Parameters/ResourcePublication'
import ResourceVisibilityForm from '@app/web/components/Resource/Edition/Parameters/ResourceVisibilityForm'
import ResourceIndexation from '@app/web/components/Resource/Edition/Parameters/ResourceIndexation'
import ResourceDeletion from '@app/web/components/Resource/Edition/Parameters/ResourceDeletion'
import InviteResourceContributors from '@app/web/components/Resource/Contributors/InviteResourceContributors'
import ResourceFeedback from './ResourceFeedback'
import styles from './ResourceParameters.module.css'

const ResourceParameters = ({
  resource,
  user,
}: {
  resource: Resource
  user: SessionUser
}) => (
  <div className={classNames('fr-container', styles.container)}>
    <ResourceParametersSideMenu />
    <div className="fr-container--slim">
      <h1 className="fr-mb-6w">Paramètres de la ressource</h1>
      <ResourcePublication resource={resource} user={user} />
      <ResourceVisibilityForm resource={resource} user={user} />
      <ResourceIndexation resource={resource} />
      <Card
        id="contributeurs"
        className="fr-mt-3w"
        title="Contributeurs"
        titleAs="h2"
        description="Les contributeurs peuvent voir, éditer, inviter d’autres contributeurs et supprimer la ressource."
        contentSeparator
      >
        <InviteResourceContributors resource={resource} />
      </Card>
      <Card
        className="fr-my-3w"
        id="avis"
        title="Avis sur la ressource"
        titleAs="h2"
        description="Les visiteurs peuvent laisser des avis sur vos ressources afin de contribuer à leur amélioration, partager des retours d’expériences, des suggestions d’améliorations..."
        contentSeparator
      >
        <ResourceFeedback resource={resource} />
      </Card>
      <Card
        className="fr-my-3w"
        id="supprimer"
        title="Supprimer la ressource"
        titleAs="h2"
        description="Cette action est irréversible et entraîne la suppression définitive de de la ressource. Utilisez cette fonction avec précaution."
        contentSeparator
      >
        <ResourceDeletion resource={resource} />
      </Card>
    </div>
  </div>
)

export default ResourceParameters
