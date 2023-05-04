import React from 'react'
import classNames from 'classnames'
import Button from '@codegouvfr/react-dsfr/Button'
import styles from './EditionActionBar.module.css'
import { ResourcePublishedState } from '../enums/ResourcePublishedState'
import { ResourceModificationState } from '../enums/ResourceModificationState'
import IconLink from '../../Icon/IconLink'
import ResourcePublishedStateBadge from './ResourcePublishedStateBadge'
import ResourceModificationStateBadge from './ResourceModificationState'

const EditionActionBar = ({
  publishedState,
  modificationState,
  actionLabel,
  actionDisabled,
}: {
  publishedState: ResourcePublishedState
  modificationState: ResourceModificationState | null
  actionLabel: string
  actionDisabled?: boolean
}) => (
  <div className={styles.container}>
    <div className={classNames('fr-container', styles.content)}>
      <div className={styles.block}>
        <ResourcePublishedStateBadge state={publishedState} />
        {modificationState && (
          <ResourceModificationStateBadge state={modificationState} />
        )}
      </div>
      <div className={styles.block}>
        <IconLink title="Supprimer" href="/" icon="fr-icon-delete-line" />
        <IconLink
          title="Ajouter un contributeur"
          href="/"
          icon="fr-icon-user-add-line"
        />
        <Button disabled={actionDisabled}>{actionLabel}</Button>
      </div>
    </div>
  </div>
)

export default EditionActionBar
