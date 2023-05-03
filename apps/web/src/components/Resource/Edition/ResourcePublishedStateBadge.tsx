import React from 'react'
import classNames from 'classnames'
import { ResourcePublishedState } from '../enums/ResourcePublishedState'
import styles from './ResourcePublishedStateBadge.module.css'

const informations: Record<
  ResourcePublishedState,
  { label: string; icon: string; color: string }
> = {
  [ResourcePublishedState.DRAFT]: {
    label: 'Brouillon',
    icon: 'fr-icon-draft-fill',
    color: 'grey',
  },
  [ResourcePublishedState.PUBLIC]: {
    label: 'Public',
    icon: 'fr-icon-earth-fill',
    color: 'green',
  },
  [ResourcePublishedState.PRIVATE]: {
    label: 'Privée',
    icon: 'fr-icon-lock-line',
    color: 'grey',
  },
}

const ResourcePublishedStateBadge = ({
  state,
}: {
  state: ResourcePublishedState
}) => {
  const information = informations[state]
  return (
    <div
      className={classNames(
        'fr-text--sm',
        'fr-mb-0',
        styles.badge,
        styles[information.color],
      )}
    >
      <span
        className={classNames(
          'fr-icon--sm',
          'fr-mb-0',
          'fr-pr-1w',
          information.icon,
        )}
      />
      {information.label}
    </div>
  )
}

export default ResourcePublishedStateBadge
