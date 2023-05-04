import React from 'react'
import classNames from 'classnames'
import { ResourceModificationState } from '../enums/ResourceModificationState'
import styles from './ResourceModificationStateBadge.module.css'

const informations: Record<
  ResourceModificationState,
  { label: string; icon: string }
> = {
  [ResourceModificationState.MODIFIED]: {
    label: 'Modification en cours',
    icon: 'ri-loader-line',
  },
  [ResourceModificationState.SAVING]: {
    label: 'Enregistrement...',
    icon: 'ri-loader-line',
  },
  [ResourceModificationState.SAVED]: {
    label: 'Enregistré',
    icon: 'fr-icon--sm fr-mb-0 fr-icon-check-line',
  },
}

const ResourceModificationStateBadge = ({
  state,
}: {
  state: ResourceModificationState
}) => {
  const information = informations[state]
  return (
    <div className={classNames('fr-text--sm', 'fr-mb-0', styles.badge)}>
      <span className={classNames(styles.icon, information.icon)} />
      <span className="fr-text--medium">{information.label}</span>
    </div>
  )
}

export default ResourceModificationStateBadge
