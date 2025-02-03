import React, { ReactNode } from 'react'
import Link from 'next/link'
import { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { Dropdown } from '@app/web/components/Dropdown/Dropdown'
import CopyLinkButton from '@app/web/components/CopyLinkButton'
import ResourceReportButton from '../../app/(public)/ressources/[slug]/_components/ResourceReportButton'
import { SessionUser } from '../../auth/sessionUser'
import OpenInviteContributorModalButton from './Contributors/OpenInviteContributorModalButton'
import OpenDeleteResourceModalButton from './OpenDeleteResourceModalButton'
import OpenSaveResourceInCollectionModalButton from './OpenSaveResourceInCollectionModalButton'

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
}: {
  resource: ResourceListItem
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
      {copyLink && (
        <li>
          <CopyLinkButton
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
      {canWrite && resource.published && (
        <li>
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
        <li>
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
        <li>
          <Link
            className="fr-btn fr-btn--sm"
            href={`/ressources/${resource.slug}/avis`}
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
        <li>
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
        <li>
          <ResourceReportButton
            user={user}
            resource={resource}
            priority="tertiary no outline"
          >
            <span
              className="ri-alert-line fr-mr-1w fr-text-label--blue-france"
              aria-hidden
            />
            Signaler
          </ResourceReportButton>
        </li>
      )}
    </ul>
  </Dropdown>
)
