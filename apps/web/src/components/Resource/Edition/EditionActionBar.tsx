import React, { useRef } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { useRouter } from 'next/navigation'
import { useOnClickOutside } from 'usehooks-ts'
import { Resource } from '@app/web/server/resources/getResource'
import InviteContributors from '../Contributors/InviteContributors'
import { ResourceEditionState } from '../enums/ResourceEditionState'
import { ResourcePublishedState } from '../enums/ResourcePublishedState'
import styles from './EditionActionBar.module.css'
import ResourceEditionStateBadge from './ResourceEditionStateBadge'
import ResourcePublishedStateBadge from './ResourcePublishedStateBadge'
import { deleteResourceModalProps } from './DeleteResourceModalContent'

const { Component: DeleteResourceModal, open: openDeleteResourceModal } =
  createModal({
    id: 'deleteResource',
    isOpenedByDefault: false,
  })

const {
  Component: InviteContributorsModal,
  open: openInviteContributorsModal,
  close: closeInviteContributorsModal,
} = createModal({
  id: 'inviteContributors',
  isOpenedByDefault: false,
})

const EditionActionBar = ({
  resource,
  publishedState,
  editionState,
  unPublishedEdits,
  canPublish,
  publishMode,
  onPublish,
  onDelete,
}: {
  resource: Resource
  publishedState: ResourcePublishedState
  editionState: ResourceEditionState
  unPublishedEdits: boolean
  canPublish: boolean
  publishMode?: boolean
  onPublish: () => void
  onDelete: () => void
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
    <>
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
                ref={buttonRef}
                type="button"
                title="Voir plus d'options"
                priority="tertiary no outline"
                iconId="fr-icon-more-line"
                nativeButtonProps={{
                  'aria-expanded': 'false',
                  'aria-controls': 'edition-action-bar-more',
                  'data-testid': 'edition-action-bar-more-actions',
                }}
              />
              <div
                className={classNames('fr-collapse', styles.collapse)}
                id="edition-action-bar-more"
                ref={collapseRef}
              >
                <Link
                  className={classNames(
                    styles.collapseButton,
                    'fr-btn',
                    'fr-btn--tertiary-no-outline',
                    'fr-icon-settings-5-line',
                    'fr-btn--icon-left',
                  )}
                  href={`/ressources/${resource.slug}/parametres`}
                  data-testid="edition-action-bar-parameters-modal"
                >
                  Paramètres de la ressource
                </Link>
                <hr className={styles.separator} />
                <Button
                  className={classNames(styles.collapseButton, 'wip')}
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
                  nativeButtonProps={{
                    'data-testid':
                      'edition-action-bar-invite-contributors-modal',
                  }}
                  onClick={openInviteContributorsModal}
                >
                  Inviter un contributeur
                </Button>
                <hr className={styles.separator} />
                <Button
                  className={styles.collapseButton}
                  type="button"
                  priority="tertiary no outline"
                  iconId="fr-icon-delete-line"
                  nativeButtonProps={{
                    'data-testid': 'edition-action-bar-delete-modal',
                  }}
                  onClick={openDeleteResourceModal}
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
      <DeleteResourceModal {...deleteResourceModalProps(onDelete)} />
      <InviteContributorsModal
        title="Inviter des contributeurs"
        className="overflowModal"
      >
        <p className="fr-mb-4w">
          Les contributeurs peuvent voir, éditer, inviter d’autres contributeurs
          et supprimer la ressource.
        </p>
        <InviteContributors
          resource={resource}
          onSuccess={closeInviteContributorsModal}
        />
      </InviteContributorsModal>
    </>
  )
}

export default EditionActionBar
