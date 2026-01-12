import type { SessionUser } from '@app/web/auth/sessionUser'
import {
  ResourceRoles,
  resourceAuthorization,
} from '@app/web/authorization/models/resourceAuthorization'
import CollectionCard from '@app/web/components/Collection/Cards/CollectionCard'
import IconInSquare from '@app/web/components/IconInSquare'
import ResourceCard from '@app/web/components/Resource/ResourceCard'
import type { BasePageData } from '@app/web/server/bases/getBase'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import styles from './BaseHomePageHighlights.module.css'

const BaseHomePageHighlights = ({
  base,
  user,
}: {
  base: BasePageData
  user: SessionUser | null
}) => {
  const { highlightedResources, highlightedCollections } = base
  const resourcesTitle =
    highlightedResources.length === 1
      ? 'Notre ressource à la une'
      : 'Nos ressources à la une'
  const collectionsTitle =
    highlightedCollections.length === 1
      ? 'Notre collection à la une'
      : 'Nos collections à la une'

  return (
    <div className="fr-flex fr-direction-column">
      {highlightedResources.length > 0 && (
        <div className="fr-pt-15v">
          <div className="fr-flex fr-direction-column fr-direction-md-row fr-align-items-md-center fr-justify-content-space-between fr-mb-6w fr-flex-gap-5v">
            <div className="fr-flex fr-align-items-md-center fr-direction-column fr-direction-md-row fr-flex-gap-5v">
              <IconInSquare iconId="ri-file-text-line" />
              <h2 className="fr-mb-0 fr-text-label--blue-france">
                {resourcesTitle}
              </h2>
            </div>
            {base.resources.length > 3 && (
              <div className="fr-hidden fr-unhidden-sm">
                <Button
                  size="large"
                  priority="secondary"
                  className="fr-width-full fr-flex fr-justify-content-center"
                  linkProps={{ href: `/bases/${base.slug}/ressources` }}
                >
                  Voir toutes nos ressources
                </Button>
              </div>
            )}
          </div>
          <div
            className={classNames(
              highlightedResources.length === 3
                ? styles.resourcesGrid
                : 'fr-flex fr-direction-column fr-flex-gap-12v',
            )}
          >
            {highlightedResources.map((resource) => (
              <ResourceCard
                className="fr-pb-0"
                resource={resource}
                key={resource.id}
                user={user}
                isContributor={resourceAuthorization(resource, user).hasRole(
                  ResourceRoles.ResourceContributor,
                )}
                context="highlight"
                highlightCount={highlightedResources.length}
              />
            ))}
          </div>
          {base.resources.length > 3 && (
            <div className="fr-hidden-sm fr-width-full fr-mt-4w">
              <Button
                priority="secondary"
                className="fr-width-full fr-flex fr-justify-content-center"
                linkProps={{ href: `/bases/${base.slug}/ressources` }}
              >
                Voir toutes nos ressources
              </Button>
            </div>
          )}
        </div>
      )}
      {highlightedCollections.length > 0 && (
        <div className="fr-pt-15v">
          <div className="fr-flex fr-direction-column fr-flex-gap-12v">
            <div className="fr-flex fr-direction-column fr-direction-md-row fr-align-items-md-center fr-justify-content-space-between">
              <div className="fr-flex fr-align-items-md-center fr-direction-column fr-direction-md-row fr-flex-gap-5v">
                <IconInSquare iconId="ri-folder-2-line" />
                <h2 className="fr-mb-0 fr-text-label--blue-france">
                  {collectionsTitle}
                </h2>
              </div>
              <div className="fr-hidden fr-unhidden-sm">
                {base.collections.length > 3 && (
                  <Button
                    size="large"
                    priority="secondary"
                    className="fr-width-full fr-flex fr-justify-content-center"
                    linkProps={{ href: `/bases/${base.slug}/collections` }}
                  >
                    Voir toutes nos collections
                  </Button>
                )}
              </div>
            </div>

            <div
              className={classNames(styles.collectionsGrid, {
                [styles.collectionsGridTwoColumns]:
                  highlightedCollections.length === 2,
                [styles.collectionsGridThreeColumns]:
                  highlightedCollections.length === 3,
              })}
            >
              {highlightedCollections.map((collection) => (
                <CollectionCard
                  orientation={
                    highlightedCollections.length === 1 ? 'row' : 'column'
                  }
                  collection={collection}
                  canWrite={false}
                  key={collection.id}
                  highlightCount={highlightedCollections.length}
                  context="highlight"
                />
              ))}
            </div>
            {base.collections.length > 3 && (
              <div className="fr-hidden-sm fr-width-full">
                <Button
                  priority="secondary"
                  className="fr-width-full fr-flex fr-justify-content-center"
                  linkProps={{ href: `/bases/${base.slug}/collections` }}
                >
                  Voir toutes nos collections
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default BaseHomePageHighlights
