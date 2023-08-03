import classNames from 'classnames'
import React, { useRef } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { useRouter } from 'next/navigation'
import { useOnClickOutside } from 'usehooks-ts'
import { ResourceEditionState } from '../enums/ResourceEditionState'
import { ResourcePublishedState } from '../enums/ResourcePublishedState'
import styles from './EditionActionBar.module.css'
import ResourceEditionStateBadge from './ResourceEditionStateBadge'
import ResourcePublishedStateBadge from './ResourcePublishedStateBadge'

const EditionActionBar = ({
  publishedState,
  editionState,
  unPublishedEdits,
  canPublish,
  onPublish,
  publishMode,
}: {
  publishedState: ResourcePublishedState
  editionState: ResourceEditionState
  unPublishedEdits: boolean
  canPublish: boolean
  onPublish: () => void
  publishMode?: boolean
}) => {
  const router = useRouter()
  const onCancelClick = () => {
    router.back()
  }

  // The click outside default behavior from dsfr js do not work in this case 🤷‍
  // So we have to use client component and hooks to handle the click outside
  const buttonRef = useRef<HTMLButtonElement>(null)
  const collapseRef = useRef<HTMLDivElement>(null)

  const onClickOutsideDropdown = (event: MouseEvent) => {
    // Let the event propagate if clicked on the control button
    if (event.target === buttonRef?.current) {
      return
    }

    // Close the dropdown if open on outside click
    if (buttonRef.current?.getAttribute('aria-expanded') !== 'true') {
      return
    }

    buttonRef.current.click()
  }
  useOnClickOutside(collapseRef, onClickOutsideDropdown)

  return (
    <div className={styles.container}>
      <div className={classNames('fr-container', styles.content)}>
        <div className={styles.block}>
          <ResourcePublishedStateBadge state={publishedState} />
          <ResourceEditionStateBadge
            editionState={editionState}
            unPublishedEdits={unPublishedEdits}
            publishedState={publishedState}
          />
        </div>
        <div className={styles.block}>
          <div className={styles.moreWrapper}>
            <Button
              type="button"
              title="Voir plus d'options"
              priority="tertiary no outline"
              iconId="fr-icon-more-line"
              nativeButtonProps={{
                'aria-expanded': 'false',
                'aria-controls': 'edition-action-bar-more',
              }}
            />
            <div
              className={classNames('fr-collapse', styles.collapse)}
              id="edition-action-bar-more"
              ref={collapseRef}
            >
              <Button
                className={styles.collapseButton}
                type="button"
                priority="tertiary no outline"
                iconId="fr-icon-settings-5-line"
              >
                Paramètres de la ressource
              </Button>
              <hr className={styles.separator} />
              <Button
                className={styles.collapseButton}
                type="button"
                priority="tertiary no outline"
                iconId="fr-icon-eye-line"
              >
                Prévisualiser la ressource
              </Button>
              <hr className={styles.separator} />
              <Button
                className={styles.collapseButton}
                type="button"
                priority="tertiary no outline"
                iconId="fr-icon-user-add-line"
              >
                Inviter un contributeur
              </Button>
              <hr className={styles.separator} />
              <Button
                className={styles.collapseButton}
                type="button"
                priority="tertiary no outline"
                iconId="fr-icon-delete-line"
              >
                Supprimer la ressource
              </Button>
            </div>
          </div>
          {publishedState === ResourcePublishedState.DRAFT && (
            <Button type="button" priority="tertiary" onClick={onCancelClick}>
              Conserver en brouillon
            </Button>
          )}
          <Button
            type="button"
            disabled={!canPublish}
            onClick={onPublish}
            data-testid="publish-resource-button"
          >
            {publishMode
              ? 'Publier maintenant'
              : publishedState === ResourcePublishedState.DRAFT
              ? 'Publier la ressource'
              : 'Publier les modifications'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EditionActionBar
