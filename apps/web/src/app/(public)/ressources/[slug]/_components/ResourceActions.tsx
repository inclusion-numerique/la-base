import type { SessionUser } from '@app/web/auth/sessionUser'
import CopyLinkButton from '@app/web/components/CopyLinkButton'
import { ResourceMoreActionsDropdown } from '@app/web/components/Resource/ResourceMoreActionsDropdown'
import SaveResourceInCollectionButton from '@app/web/components/Resource/SaveResourceInCollectionButton'
import type { Resource } from '@app/web/server/resources/getResource'
import { getServerUrl } from '@app/web/utils/baseUrl'
import Button from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'
import styles from './ResourceActions.module.css'
import ResourceReportButton from './ResourceReportButton'

const ResourceActions = ({
  resource,
  user,
  canWrite,
}: {
  resource: Resource
  user: SessionUser | null
  canWrite: boolean
}) => {
  const isPublished = !!resource.published
  const resourceCreator = user?.id === resource.createdById
  const isAdmin = user?.role === 'Admin'
  const isBaseMember = resource.base?.members.some(
    (member) => member.memberId === user?.id && member.accepted,
  )
  // Admins who are NOT resource creators and NOT base members should see normal user actions
  const adminAsNormalUser =
    isAdmin && !resourceCreator && !(resource.baseId && isBaseMember)
  const showEditActions = canWrite && !adminAsNormalUser
  const showUserActions = !canWrite || adminAsNormalUser

  return (
    <div className={styles.container}>
      <div>
        {showEditActions && (
          <>
            <Button
              size="small"
              data-testid="resource-edition-button"
              iconId="fr-icon-edit-line"
              className="fr-unhidden-sm fr-hidden"
              linkProps={{
                href: `/ressources/${resource.slug}/editer`,
                prefetch: false,
              }}
            >
              Modifier
            </Button>
            <Button
              data-testid="resource-edition-button"
              iconId="fr-icon-edit-line"
              className="fr-hidden-sm"
              linkProps={{
                href: `/ressources/${resource.slug}/editer`,
                prefetch: false,
              }}
            >
              Modifier
            </Button>
          </>
        )}
        {isPublished && (
          <>
            <SaveResourceInCollectionButton
              className={showEditActions ? 'fr-unhidden-sm fr-hidden' : ''}
              size="small"
              priority="secondary"
              resource={resource}
              user={user}
              data-testid="save-resource-in-collection-button"
              iconPosition="left"
            >
              {showEditActions ? undefined : 'Enregistrer'}
            </SaveResourceInCollectionButton>
            <CopyLinkButton
              className="fr-unhidden-sm fr-hidden"
              size="small"
              priority="secondary"
              url={getServerUrl(`/ressources/${resource.slug}`, {
                absolutePath: true,
              })}
            />
          </>
        )}
      </div>
      <div>
        {!isPublished && showEditActions && (
          <ResourceMoreActionsDropdown
            canWrite={showEditActions}
            saveResourceInCollection={false}
            copyLink={false}
            resource={resource}
            priority="secondary"
            modalPriority="tertiary no outline"
            modalControlClassName="ri-lg"
          >
            <span className="fr-unhidden-md fr-hidden">
              &ensp;Plus d’options
            </span>
            <span className="fr-hidden-md fr-unhidden fr-sr-only">
              Plus d’options
            </span>
          </ResourceMoreActionsDropdown>
        )}
        {isPublished && (
          <>
            {showUserActions && (
              <>
                <Link
                  className="fr-btn fr-btn--secondary fr-btn--sm fr-unhidden-sm fr-hidden"
                  href={`/ressources/${resource.slug}/avis`}
                >
                  <span className="ri-emotion-line fr-mr-1w" aria-hidden />
                  Donner son avis
                </Link>
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
                    modalControlClassName="ri-lg"
                  />
                </span>
              </>
            )}
            {showEditActions && (
              <ResourceMoreActionsDropdown
                canWrite={showEditActions}
                saveResourceInCollection="sm"
                copyLink={false}
                resource={resource}
                priority="secondary"
                modalPriority="tertiary no outline"
                modalControlClassName="ri-lg"
              >
                <span className="fr-unhidden-md fr-hidden">
                  &ensp;Plus d’options
                </span>
                <span className="fr-hidden-md fr-unhidden fr-sr-only">
                  Plus d’options
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
