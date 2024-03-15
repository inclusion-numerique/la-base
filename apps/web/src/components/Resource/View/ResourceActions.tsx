import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { SessionUser } from '@app/web/auth/sessionUser'
import { Resource } from '@app/web/server/resources/getResource'
import SaveResourceInCollectionButton from '@app/web/components/Resource/SaveResourceInCollectionButton'
import CopyLinkButton from '@app/web/components/CopyLinkButton'
import { getServerUrl } from '@app/web/utils/baseUrl'
import DeleteResourceButton from '@app/web/components/Resource/DeleteResourceButton'
import ResourceReportButton from '@app/web/components/Resource/View/ResourceReportButton'
import styles from './ResourceActions.module.css'

const {
  Component: ResourceMoreActionsModal,
  buttonProps: resourceMoreActionsModalNativeButtonProps,
} = createModal({
  id: 'resource-more-actions',
  isOpenedByDefault: false,
})

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

  const canSaveInCollection = isPublished

  const canCopyLink = isPublished

  return (
    <>
      <div className={styles.container}>
        {/* Destkop left actions */}
        <div className="fr-hidden fr-unhidden-md">
          {canWrite && (
            <Button
              data-testid="resource-edition-button"
              priority="secondary"
              size="small"
              iconId="fr-icon-edit-line"
              linkProps={{
                href: `/ressources/${resource.slug}/editer`,
              }}
            >
              Modifier
            </Button>
          )}
          {canSaveInCollection && (
            <SaveResourceInCollectionButton
              resource={resource}
              user={user}
              data-testid="save-resource-in-collection-button"
            />
          )}
          {canCopyLink && (
            <CopyLinkButton
              url={getServerUrl(`/ressources/${resource.slug}`, true)}
              priority="secondary"
            />
          )}
        </div>

        {/* Mobile left actions */}
        <div className="fr-hidden-md">
          {/* Only display the first button in mobile */}
          {canWrite && (
            <Button
              data-testid="resource-edition-button"
              priority="secondary"
              size="small"
              iconId="fr-icon-edit-line"
              linkProps={{
                href: `/ressources/${resource.slug}/editer`,
              }}
            >
              Modifier
            </Button>
          )}
          {/* We display icon-only in mobile */}
          {canSaveInCollection && (
            <SaveResourceInCollectionButton
              resource={resource}
              user={user}
              data-testid="save-resource-in-collection-button"
              variant={canWrite ? 'icon-only' : undefined}
            />
          )}
        </div>

        {/* Desktop right actions */}
        <div className="fr-hidden fr-unhidden-md">
          {!isPublished && canDelete && (
            <DeleteResourceButton resourceId={resource.id} variant="tertiary" />
          )}
          {isPublished && (
            <Button
              size="small"
              priority="tertiary"
              iconId="fr-icon-more-fill"
              {...resourceMoreActionsModalNativeButtonProps}
            >
              Plus d’options
            </Button>
          )}
        </div>

        {/* Mobile right actions */}
        <div className="fr-hidden-md">
          {!isPublished && canDelete && (
            <DeleteResourceButton
              resourceId={resource.id}
              variant="icon-only"
            />
          )}
          {isPublished && (
            <Button
              size="small"
              title="Plus d’options"
              priority="tertiary no outline"
              iconId="fr-icon-more-fill"
              {...resourceMoreActionsModalNativeButtonProps}
            />
          )}
        </div>
      </div>
      <ResourceMoreActionsModal
        className={styles.moreActionsModal}
        title="Options disponibles"
        buttons={[
          {
            title: 'Annuler',
            priority: 'tertiary',
            children: 'Annuler',
          },
        ]}
      >
        {!isPublished && canDelete && (
          <DeleteResourceButton resourceId={resource.id} />
        )}
        <ResourceReportButton />
        {canCopyLink && (
          <>
            {/* Copy Link is always available in left options in desktop */}
            <CopyLinkButton
              className="fr-hidden-md"
              url={getServerUrl(`/ressources/${resource.slug}`, true)}
              priority="secondary"
              size="medium"
            >
              Partager le lien
            </CopyLinkButton>
          </>
        )}
      </ResourceMoreActionsModal>
    </>
  )
}

export default ResourceActions
