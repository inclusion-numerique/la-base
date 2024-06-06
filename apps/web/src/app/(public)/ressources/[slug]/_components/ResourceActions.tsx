import React from 'react'
import Link from 'next/link'
import Button from '@codegouvfr/react-dsfr/Button'
import { SessionUser } from '@app/web/auth/sessionUser'
import { getServerUrl } from '@app/web/utils/baseUrl'
import CopyLinkButton from '@app/web/components/CopyLinkButton'
import SaveResourceInCollectionButton from '@app/web/components/Resource/SaveResourceInCollectionButton'
import OpenDeleteResourceModalButton from '@app/web/components/Resource/OpenDeleteResourceModalButton'
import { ResourceMoreActionsDropdown } from '@app/web/components/Resource/ResourceMoreActionsDropdown'
import { Resource } from '@app/web/server/resources/getResource'
import ResourceReportButton from './ResourceReportButton'
import styles from './ResourceActions.module.css'

const ResourceActions = ({
  resource,
  user,
  canDelete,
  canWrite,
}: {
  resource: Resource
  user: SessionUser | null
  canWrite: boolean
  canDelete: boolean
}) => {
  const isPublished = !!resource.published

  return (
    <div className={styles.container}>
      <div>
        {canWrite && (
          <Button
            size="small"
            data-testid="resource-edition-button"
            iconId="fr-icon-edit-line"
            linkProps={{
              href: `/ressources/${resource.slug}/editer`,
            }}
          >
            Modifier
          </Button>
        )}
        {isPublished && (
          <>
            <SaveResourceInCollectionButton
              size="small"
              priority="secondary"
              resource={resource}
              user={user}
              data-testid="save-resource-in-collection-button"
            >
              {canWrite ? undefined : 'Enregistrer'}
            </SaveResourceInCollectionButton>
            <CopyLinkButton
              className="fr-unhidden-sm fr-hidden"
              size="small"
              priority="secondary"
              url={getServerUrl(`/ressources/${resource.slug}`, true)}
            />
          </>
        )}
      </div>
      <div>
        {!isPublished && canDelete && (
          <OpenDeleteResourceModalButton resourceId={resource.id} />
        )}
        {isPublished && (
          <>
            {(!canWrite || resource._count.resourceFeedback > 0) && (
              <Link
                className="fr-btn fr-btn--secondary fr-btn--sm fr-unhidden-sm fr-hidden"
                href={`/ressources/${resource.slug}/avis`}
              >
                <span className="ri-emotion-line fr-mr-1w" aria-hidden />
                {canWrite ? 'Voir les avis' : 'Donner son avis'}
              </Link>
            )}
            {!canWrite && (
              <>
                <ResourceReportButton
                  className="fr-unhidden-sm fr-hidden fr-btn--secondary"
                  size="small"
                  variant="icon-only"
                  user={user}
                  resource={resource}
                />
                <span className="fr-hidden-sm">
                  <ResourceMoreActionsDropdown
                    resource={resource}
                    user={user}
                    saveResourceInCollection={false}
                    copyLink={false}
                  />
                </span>
              </>
            )}
            {canWrite && (
              <ResourceMoreActionsDropdown
                canWrite
                saveResourceInCollection={false}
                copyLink={false}
                resource={resource}
                priority="secondary"
              >
                <span className="fr-unhidden-sm fr-hidden">
                  &ensp;Plus d’options
                </span>
              </ResourceMoreActionsDropdown>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ResourceActions
