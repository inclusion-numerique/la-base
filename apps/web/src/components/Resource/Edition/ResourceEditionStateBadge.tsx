import classNames from 'classnames'
import React from 'react'
import { ResourceEditionState } from '../enums/ResourceEditionState'
import styles from './ResourceEditionStateBadge.module.css'

const informations: {
  [state in ResourceEditionState]: { label: string; icon: string }
} = {
  [ResourceEditionState.EDITING]: {
    label: 'Edition en cours',
    icon: 'ri-loader-line',
  },
  [ResourceEditionState.SAVING]: {
    label: 'Enregistrement...',
    icon: 'ri-loader-line',
  },
  [ResourceEditionState.SAVED]: {
    label: 'Enregistré',
    icon: 'fr-icon--sm fr-mb-0 fr-icon-check-line',
  },
}

const ResourceEditionStateBadge = ({
  state,
}: {
  state: ResourceEditionState
}) => {
  const information = informations[state]
  return (
    <div
      className={classNames('fr-text--sm', 'fr-mb-0', styles.badge)}
      data-testid="resource-edition-state"
    >
      <span className={classNames(styles.icon, information.icon)} />
      <span className="fr-text--medium">{information.label}</span>
    </div>
  )
}

export default ResourceEditionStateBadge
