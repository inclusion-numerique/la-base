import { deleteResourceModalProps } from '@app/web/components/Resource/Edition/DeleteResourceModalContent'
import ResourceEditionStateBadge from '@app/web/components/Resource/Edition/ResourceEditionStateBadge'
import ResourcePublishedStateBadge from '@app/web/components/Resource/Edition/ResourcePublishedStateBadge'
import type { ResourceEditionState } from '@app/web/components/Resource/enums/ResourceEditionState'
import { ResourcePublishedState } from '@app/web/components/Resource/enums/ResourcePublishedState'
import type { Resource } from '@app/web/server/resources/getResource'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import classNames from 'classnames'
import Link from 'next/link'
import React, { useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import InviteContributorModal from '../Contributors/InviteContributorModal'
import OpenInviteContributorModalButton from '../Contributors/OpenInviteContributorModalButton'

import styles from './ResourceEditionActionBar.module.css'

const { Component: DeleteResourceModal, open: openDeleteResourceModal } =
  createModal({
    id: 'delete-resource',
    isOpenedByDefault: false,
  })

const ResourceEditionActionBar = ({
  resource,
  publishedState,
  editionState,
  unPublishedEdits,
  isSubmitting,
  publishMode,
  onPublish,
  onDelete,
}: {
  resource: Resource
  publishedState: ResourcePublishedState
  editionState: ResourceEditionState
  unPublishedEdits: boolean
  isSubmitting: boolean
  publishMode?: boolean
  onPublish: () => void
  onDelete: () => void
}) => {
  // The click outside default behavior from dsfr js do not work in this case 🤷‍
  // So we have to use client component and hooks to handle the click outside
  const buttonRef = useRef<HTMLButtonElement>(null)
  const collapseRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(collapseRef, (event) => {
    // Let the event propagate if clicked on the control button
    if (event.target === buttonRef?.current) {
      return
    }

    // Close the dropdown if open on outside click
    if (buttonRef.current?.getAttribute('aria-expanded') !== 'true') {
      return
    }

    buttonRef.current.click()
  })

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
                title="Voir plus d’options"
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
                {!!resource.published && (
                  <>
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
                  </>
                )}
                <OpenInviteContributorModalButton
                  resource={resource}
                  priority="tertiary no outline"
                >
                  <span
                    className="ri-user-add-line fr-mr-1w fr-text-label--blue-france"
                    aria-hidden
                  />
                  Inviter un contributeur
                </OpenInviteContributorModalButton>
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
              <Button
                priority="tertiary"
                linkProps={{
                  href: `/ressources/${resource.slug}`,
                }}
              >
                Conserver en brouillon
              </Button>
            )}
            <Button
              type="button"
              className={classNames({ 'fr-btn--loading': isSubmitting })}
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
      <InviteContributorModal />
    </>
  )
}

export default ResourceEditionActionBar
