import CopyLinkButton from '@app/web/components/CopyLinkButton'
import { Dropdown } from '@app/web/components/Dropdown/Dropdown'
import OpenShareLinkModalButton from '@app/web/features/shareableLink/components/OpenShareLinkModalButton'
import { appendShareToken } from '@app/web/features/shareableLink/utils/shareTokenUtils'
import type { BaseResource } from '@app/web/server/bases/getBase'
import type { Resource } from '@app/web/server/resources/getResource'
import { getServerUrl } from '@app/web/utils/baseUrl'
import type { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'
import { type ReactNode } from 'react'
import ResourceReportButton from '../../app/(public)/ressources/[slug]/_components/ResourceReportButton'
import type { SessionUser } from '../../auth/sessionUser'
import OpenInviteContributorModalButton from './Contributors/OpenInviteContributorModalButton'
import OpenDeleteResourceModalButton from './OpenDeleteResourceModalButton'
import OpenSaveResourceInCollectionModalButton from './OpenSaveResourceInCollectionModalButton'
import styles from './ResourceMoreActionsDropdown.module.css'

export const ResourceMoreActionsDropdown = ({
  resource,
  user,
  priority = 'tertiary no outline',
  modalPriority = 'tertiary no outline',
  modalControlClassName,
  dropdownControlClassName,
  children,
  saveResourceInCollection = true,
  size = 'small',
  copyLink = true,
  canWrite = false,
  context = 'view',
  shareToken,
}: {
  resource: BaseResource | Resource
  user?: SessionUser | null
  priority?: ButtonProps['priority']
  modalPriority?: ButtonProps['priority']
  modalControlClassName?: string
  dropdownControlClassName?: string
  children?: ReactNode
  saveResourceInCollection?: boolean | 'sm'
  size?: ButtonProps['size']
  copyLink?: boolean
  canWrite?: boolean
  context?: 'view' | 'card'
  shareToken?: string
}) => (
  <Dropdown
    id={`more_actions_for_${resource.slug}`}
    title="Options sur la ressource"
    priority={priority}
    modalPriority={modalPriority}
    modalControlClassName={modalControlClassName}
    dropdownControlClassName={dropdownControlClassName}
    size={size}
    alignRight
    displayDropdownArrow={false}
    control={
      <>
        <span className="ri-more-fill" aria-hidden />
        <span className="fr-sr-only">Options sur la ressource</span>
        {children}
      </>
    }
  >
    <ul>
      {resource.published && saveResourceInCollection && (
        <li
          className={
            saveResourceInCollection === true
              ? ''
              : `fr-unhidden fr-hidden-${saveResourceInCollection}`
          }
        >
          <OpenSaveResourceInCollectionModalButton
            size="small"
            className={styles.border}
            title={`Enregistrer "${resource.title}" dans une collection`}
            resourceId={resource.id}
          >
            <span
              className="ri-bookmark-line fr-mr-1w fr-text-label--blue-france"
              aria-hidden
            />
            Enregistrer
          </OpenSaveResourceInCollectionModalButton>
        </li>
      )}
      {copyLink && resource.isPublic && (
        <li className={styles.border}>
          <CopyLinkButton
            context="resource"
            size="small"
            priority="tertiary no outline"
            displayIcon={false}
            url={getServerUrl(`/ressources/${resource.slug}`, {
              absolutePath: true,
            })}
          >
            <span
              className="ri-link fr-mr-1w fr-text-label--blue-france"
              aria-hidden
            />
            Partager un lien
          </CopyLinkButton>
        </li>
      )}
      {context === 'card' &&
        canWrite &&
        resource.published &&
        !resource.isPublic &&
        user && (
          <li className={styles.border}>
            <OpenShareLinkModalButton type="resource" resource={resource}>
              <span
                className="ri-link fr-mr-1w fr-text-label--blue-france"
                aria-hidden
              />
              Partager un lien
            </OpenShareLinkModalButton>
          </li>
        )}
      {canWrite && resource.published && (
        <li className={styles.border}>
          <Link
            className="fr-btn fr-btn--sm"
            href={`/ressources/${resource.slug}/parametres`}
          >
            <span
              className="ri-settings-5-line fr-mr-1w fr-text-label--blue-france"
              aria-hidden
            />
            Modifier les paramètres
          </Link>
        </li>
      )}
      {canWrite && (
        <li className={styles.border}>
          <OpenInviteContributorModalButton size="small" resource={resource}>
            <span
              className="ri-user-add-line fr-mr-1w fr-text-label--blue-france"
              aria-hidden
            />
            Inviter un contributeur
          </OpenInviteContributorModalButton>
        </li>
      )}
      {resource.published && (
        <li className={styles.border}>
          <Link
            className="fr-btn fr-btn--sm"
            href={appendShareToken(
              `/ressources/${resource.slug}/avis`,
              shareToken,
            )}
          >
            <span
              className="ri-emotion-line fr-mr-1w fr-text-label--blue-france"
              aria-hidden
            />
            {canWrite ? 'Voir les avis' : 'Donner son avis'}
          </Link>
        </li>
      )}
      {canWrite && (
        <li className={styles.border}>
          <OpenDeleteResourceModalButton resourceId={resource.id} size="small">
            <span
              className="ri-delete-bin-6-line fr-mr-1w fr-text-label--blue-france"
              aria-hidden
            />
            Supprimer la ressource
          </OpenDeleteResourceModalButton>
        </li>
      )}
      {!canWrite && (
        <li className={styles.border}>
          <ResourceReportButton
            user={user}
            resource={resource}
            priority="tertiary no outline"
            className="fr-btn--sm"
          >
            <span
              className="ri-alert-line fr-mr-1w fr-text-label--blue-france"
              aria-hidden
            />
            Signaler
            <span className="fr-sr-only">Signaler la ressource</span>
          </ResourceReportButton>
        </li>
      )}
    </ul>
  </Dropdown>
)
