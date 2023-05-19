import classNames from 'classnames'
import React, { MouseEventHandler } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import CustomTag, { TagColor } from '@app/web/components/CustomTag'
import { ResourceEditionState } from '../enums/ResourceEditionState'
import { ResourcePublishedState } from '../enums/ResourcePublishedState'
import styles from './EditionActionBar.module.css'
import ResourceEditionStateBadge from './ResourceEditionStateBadge'
import ResourcePublishedStateBadge from './ResourcePublishedStateBadge'

const EditionActionBar = ({
  publishedState,
  editionState,
  unPublishedEdits,
  actionLabel,
  actionDisabled,
  action,
}: {
  publishedState: ResourcePublishedState
  editionState: ResourceEditionState | null
  unPublishedEdits?: boolean
  actionLabel: string
  actionDisabled?: boolean
  action: MouseEventHandler<HTMLButtonElement>
}) => (
  <div className={styles.container}>
    <div className={classNames('fr-container', styles.content)}>
      <div className={styles.block}>
        <ResourcePublishedStateBadge state={publishedState} />
        {unPublishedEdits && (
          <CustomTag
            icon="fr-icon-edit-line"
            label="Modifications non publiées"
            color={TagColor.ORANGE}
            data-testid="unpublished-edits-tag"
            className="fr-ml-1w"
          />
        )}
        {editionState && <ResourceEditionStateBadge state={editionState} />}
      </div>
      <div className={styles.block}>
        <Button
          type="button"
          title="Supprimer"
          priority="tertiary no outline"
          iconId="fr-icon-delete-line"
        />
        <Button
          type="button"
          title="Ajouter un contributeur"
          priority="tertiary no outline"
          iconId="fr-icon-user-add-line"
        />
        <Button
          type="button"
          disabled={actionDisabled}
          onClick={action}
          data-testid="publish-resource-button"
        >
          {actionLabel}
        </Button>
      </div>
    </div>
  </div>
)

export default EditionActionBar
